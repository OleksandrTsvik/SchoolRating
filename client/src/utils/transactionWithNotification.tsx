import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

import { ApiError } from '../api/config';
import ShowError from '../components/ShowError';

export default async function transactionWithNotification(
	operation: () => void,
	successMessage: string = 'Операцію виконано успішно',
	alternativeErrorMessage: string = 'Виникла помилка',
	placement: NotificationPlacement = 'bottomRight'
): Promise<void> {
	try {
		await operation();

		notification.open({
			type: 'success',
			message: successMessage,
			placement
		});
	} catch (error) {
		notification.open({
			type: 'error',
			message: alternativeErrorMessage,
			description: <ShowError error={error as ApiError} />,
			placement
		});
	}
}