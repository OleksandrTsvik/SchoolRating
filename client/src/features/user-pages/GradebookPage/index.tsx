import { useParams } from 'react-router-dom';
import { Empty, Skeleton, Spin } from 'antd';
import Title from 'antd/es/typography/Title';

import { ApiError } from '../../../api/config';
import { useGetGradebookQuery } from '../../../api/services/teacherService';
import FailedRequest from '../../../components/FailedRequest';
import TableWithoutRating from './TableWithoutRating';
import TableRating from './TableRating';
import AddRatingColumn from './AddRatingColumn';

import styles from './GradebookPage.module.scss';

export default function GradebooksPage() {
	const { id } = useParams();
	const { data, isLoading, isFetching, error, refetch } = useGetGradebookQuery({ id: id as string });

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
			<Title level={2} className="d-flex justify-content-center align-items-center">
				{data.cls?.name}. {data.subject?.name}
			</Title>
			<Spin spinning={isFetching}>
				<div className="d-flex gap-1">
					<div className="table-responsive w-100">
						{data.ratings.length === 0
							? <TableWithoutRating students={data.cls!.students} />
							: <TableRating data={data} />
						}
					</div>
					<div className={styles.btnWrapper}>
						<AddRatingColumn educationId={data.id} />
					</div>
				</div>
			</Spin>
		</>
	);
}