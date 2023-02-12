import { Button, Result } from 'antd';

import ShowError from '../ShowError';
import { ApiError } from '../../api/config';

interface Props {
	loading: boolean;
	error: ApiError;
	refetch: () => any;
}

export default function FailedRequest({ loading, error, refetch }: Props) {
	return (
		<Result
			status="error"
			title={<ShowError
				error={error as ApiError}
				message="Виникла помилка під час завантаження даних"
			/>}
			extra={[
				<Button key="refetch" loading={loading} onClick={refetch}>
					Надіслати повторний запит
				</Button>
			]}
		/>
	);
}