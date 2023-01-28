import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logOut } from './authAdminSlice';

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3001/api/admin/auth',
});

const authAdminFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
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
						url: '/refresh',
						method: 'PUT',
						credentials: 'include',
					},
					api,
					extraOptions
				);

				if (refreshResult.data) {
					// Retry the initial query
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logOut());
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

export default authAdminFetchBase;