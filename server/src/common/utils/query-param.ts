import { Query } from 'express-serve-static-core';
import { ILike } from 'typeorm';

export function queryParamForWhere(
	query: Query,
	column: string,
	paramQuery: string = column
) {
	return query[paramQuery]
		? { [column]: ILike(`%${query[paramQuery]}%`) }
		: {};
}

export function queryParamsForWhere(
	query: Query,
	columns: string[],
	paramsQuery: string[] = columns
) {
	if (columns.length !== paramsQuery.length) {
		throw new Error('IllegalArgumentException: columns.length !== paramsQuery.length');
	}

	const obj = {};

	columns.forEach(
		(column, index) => {
			const paramQuery = query[paramsQuery[index]];
			if (paramQuery) {
				obj[column] = ILike(`%${paramQuery}%`);
			}
		}
	);

	return obj;
}