import { Link } from 'react-router-dom';
import { Badge, Empty, List, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';

import { ApiError } from '../../../api/config';
import { useGetGradebooksQuery } from '../../../api/services/teacherService';
import useUserAuth from '../../../hooks/useUserAuth';
import FailedRequest from '../../../components/FailedRequest';

import styles from './GradebooksPage.module.scss';

export default function GradebooksPage() {
	const { teacher } = useUserAuth();
	const { data, isLoading, isFetching, error, refetch } = useGetGradebooksQuery({ id: teacher.id });

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data || data.length === 0) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<>
			<Title level={2} className="text-center">
				Журнали ({data.length})
			</Title>
			<List
				className={styles.list}
				loading={isFetching}
				itemLayout="horizontal"
				dataSource={data}
				renderItem={(education) => (
					<Link
						className={styles.item}
						to={`/gradebook/${education.id}`}
					>
						<div>{education.subject?.name}</div>
						<div className="d-flex gap-4">
							<div>{education.cls?.name}</div>
							<Badge
								count={education.cls?.students?.length}
								style={{ backgroundColor: '#1677ff' }}
							/>
						</div>
					</Link>
				)}
			/>
		</>
	);
}