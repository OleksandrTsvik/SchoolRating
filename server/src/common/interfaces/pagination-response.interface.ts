export default interface PaginationResponse<T> {
	total: number;
	data: T[];
	page: number;
	limit: number;
}