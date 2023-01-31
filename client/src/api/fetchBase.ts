import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, } from '@reduxjs/toolkit/query';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Mutex } from 'async-mutex';
import { baseUrl } from './config';
import { RootState } from '../store';

export default function fetchBase(
	endUrl: string,
	actionLogout: () => ThunkDispatch<RootState, any, AnyAction>,
	refreshUrl: string = '/refresh',
	refreshMethod: string = 'PUT'
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
	// create a new mutex
	const mutex = new Mutex();

	const baseQuery = fetchBaseQuery({
		baseUrl: `${baseUrl}${endUrl}`,
		credentials: 'include'
	});

	return async (args, api, extraOptions) => {
		// wait until the mutex is available without locking it
		await mutex.waitForUnlock();

		let result = await baseQuery(args, api, extraOptions);

		if (result.error && result.error.status === 401) {
			// checking whether the mutex is locked
			if (!mutex.isLocked()) {
				const release = await mutex.acquire();

				try {
					const refreshResult = await baseQuery(
						{
							url: `${baseUrl}${refreshUrl}`,
							method: refreshMethod
						},
						api,
						extraOptions
					);

					if (refreshResult.data) {
						// Retry the initial query
						result = await baseQuery(args, api, extraOptions);
					} else {
						api.dispatch(actionLogout());
					}
				} finally {
					// release must be called once the mutex should be released again
					release();
				}
			} else {
				// wait until the mutex is available without locking it
				await mutex.waitForUnlock();
				result = await baseQuery(args, api, extraOptions);
			}
		}

		return result;
	};
}