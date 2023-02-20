import Moment from 'moment';
import { Descriptions, Empty, Skeleton, Space, Tag } from 'antd';
import Title from 'antd/es/typography/Title';

import { ApiError } from '../../../api/config';
import { useGetTeacherQuery } from '../../../api/services/teacherService';
import getFullName from '../../../utils/getFullName';
import FailedRequest from '../../../components/FailedRequest';

interface Props {
	id: string;
}

export default function TeacherCabinet({ id }: Props) {
	const { data, isLoading, isFetching, error, refetch } = useGetTeacherQuery({ id });

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
			<div className="text-center">
				<Title level={2}>Вітаємо!</Title>
				<Title level={5}>Ви увійшли до власного електронного кабінету.</Title>
			</div>
			<Descriptions title="Облікові дані" bordered column={24}>
				<Descriptions.Item span={24} label="ПІБ">{getFullName(data)}</Descriptions.Item>
				<Descriptions.Item span={24} label="Викладає">
					<Space wrap>
						{data.educations.map((teacher) => (
							<Tag key={teacher.id}>{teacher.cls?.name} &mdash; {teacher.subject?.name}</Tag>
						))}
					</Space>
				</Descriptions.Item>
				<Descriptions.Item span={24} label="Email">{data.email}</Descriptions.Item>
				<Descriptions.Item span={24} label="Дата реєстрації">
					{Moment(data.createdAt).format('DD.MM.YYYY HH:mm')}
				</Descriptions.Item>
			</Descriptions>
		</>
	);
}