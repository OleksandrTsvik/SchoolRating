import { MutationLifecycleApi, QueryLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { logout, setUser } from './authUserSlice';
import { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes';

export async function setUserOnQueryStarted<QueryArg,
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
		api.dispatch(setUser(data));
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