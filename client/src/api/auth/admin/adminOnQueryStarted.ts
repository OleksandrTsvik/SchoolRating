import { MutationLifecycleApi, QueryLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes';
import { logout, setAdmin, setIsAdminStoreLoading } from './authAdminSlice';

export async function setAdminOnQueryStarted<QueryArg,
	BaseQuery extends BaseQueryFn,
	ResultType,
	ReducerPath extends string = string>
(
	arg: QueryArg,
	api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath> |
		QueryLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>
): Promise<void> {
	api.dispatch(setIsAdminStoreLoading(true));
	
	try {
		const { data } = await api.queryFulfilled;
		api.dispatch(setAdmin(data));
	} catch (error) {
		// console.log(error);
	} finally {
		api.dispatch(setIsAdminStoreLoading(false));
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