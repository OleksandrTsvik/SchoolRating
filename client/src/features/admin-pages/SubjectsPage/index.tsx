import { Empty, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';

import { ApiError } from '../../../api/config';
import { useGetSubjectsQuery } from '../../../api/services/subjectService';
import FailedRequest from '../../../components/FailedRequest';
import TableSubjects from './TableSubjects';
import AddSubject from './AddSubject';

export default function SubjectsPage() {
	document.title = 'Предмети';

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