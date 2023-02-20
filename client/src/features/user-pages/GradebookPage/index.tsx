import { Empty, Skeleton } from 'antd';

import { ApiError } from '../../../api/config';
import { useGetGradebookClassesQuery } from '../../../api/services/teacherService';
import FailedRequest from '../../../components/FailedRequest';

export default function GradebookPage() {
	const { data, isLoading, isFetching, error, refetch } = useGetGradebookClassesQuery();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<>
			Hello Gradebook!!!
		</>
	);
}