import { Empty, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';

import TableSubjects from '../../subjects/TableSubjects';
import AddSubject from '../../subjects/AddSubject';
import { useGetSubjectsQuery } from '../../../../api/services/subjectService';
import FailedRequest from '../../../../components/FailedRequest';
import { ApiError } from '../../../../api/config';

export default function SubjectsPage() {
	const { data, isLoading, isFetching, error, refetch } = useGetSubjectsQuery();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data || data.length === 0) {
		return (
			<>
				<AddSubject />
				<Empty className="mt-4" description="Предмети відсутні" />
			</>
		);
	}

	return (
		<>
			<Title level={2} className="text-center">
				Предмети ({data.length})
			</Title>
			<AddSubject />
			<TableSubjects subjects={data} isLoading={isFetching} />
		</>
	);
}