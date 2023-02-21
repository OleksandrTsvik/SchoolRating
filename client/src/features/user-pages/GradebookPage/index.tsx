import { useParams } from 'react-router-dom';
import { Empty, Skeleton } from 'antd';

import { ApiError } from '../../../api/config';
import { useGetGradebookQuery } from '../../../api/services/teacherService';
import FailedRequest from '../../../components/FailedRequest';

export default function GradebooksPage() {
	const { id } = useParams();
	const { data, isLoading, isFetching, error, refetch } = useGetGradebookQuery({ id: id as string });

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	// if (!data || data.length === 0) {
	if (!data) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<>
			Hello gradebook {id}
		</>
	);
}