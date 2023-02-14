import { Empty, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';

import FailedRequest from '../../../../components/FailedRequest';
import { ApiError } from '../../../../api/config';
import { useGetClassesQuery } from '../../../../api/services/classService';
import AddClass from '../../classes/AddClass';
import TableClasses from '../../classes/TableClasses';

export default function ClassesPage() {
	const { data, isLoading, isFetching, error, refetch } = useGetClassesQuery();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data || data.length === 0) {
		return (
			<>
				<AddClass />
				<Empty className="mt-4" description="Класи відсутні" />
			</>
		);
	}

	return (
		<>
			<Title level={2} className="text-center">
				Класи ({data.length})
			</Title>
			<AddClass />
			<TableClasses classes={data} isLoading={isFetching} />
		</>
	);
}