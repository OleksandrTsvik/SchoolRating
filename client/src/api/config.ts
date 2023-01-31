export const baseUrl = 'http://localhost:3001/api';

export const urlAdminRefresh = '/admin/auth/refresh';

export interface ApiError {
	data: {
		error: string,
		message: string | string[],
		statusCode: number
	};
	status: number;
}