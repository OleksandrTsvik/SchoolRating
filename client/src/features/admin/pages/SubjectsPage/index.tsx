import { Empty, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';

import TableSubjects from '../../subjects/TableSubjects';
import AddSubject from '../../subjects/AddSubject';
import { useGetSubjectsQuery } from '../../../../api/services/subjectService';
import FailedRequest from '../../../../components/FailedRequest';
import { ApiError } from '../../../../api/config';

export default function SubjectsPage() {
	const { data, isFetching, error, refetch } = useGetSubjectsQuery();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isFetching) {
		return <Skeleton active />;
	}

	if (!data || data.length === 0) {
		return (
			<>
				<Empty description="Предмети відсутні" />
				<AddSubject />
			</>
		);
	}

	return (
		<>
			<Title level={2} className="text-center">
				Предмети ({data.length})
			</Title>
			<AddSubject />
			<TableSubjects subjects={data} />
		</>
	);
}