import { MutationLifecycleApi, QueryLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes';
import { logout, setAdmin } from './authAdminSlice';

export async function setAdminOnQueryStarted<QueryArg,
	BaseQuery extends BaseQueryFn,
	ResultType,
	ReducerPath extends string = string>
(
	arg: QueryArg,
	api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath> |
		QueryLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>
): Promise<void> {
	try {
		const { data } = await api.queryFulfilled;
		api.dispatch(setAdmin(data));
	} catch (error) {
		// console.log(error);
	}
}

export async function logoutOnQueryStarted<QueryArg,
	BaseQuery extends BaseQueryFn,
	ResultType,
	ReducerPath extends string = string>
(
	arg: QueryArg,
	api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath> |
		QueryLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>
): Promise<void> {
	try {
		await api.queryFulfilled;
		api.dispatch(logout());
	} catch (error) {
		// console.log(error);
	}
}