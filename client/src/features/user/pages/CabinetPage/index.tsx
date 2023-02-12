import { Descriptions } from 'antd';
import Title from 'antd/es/typography/Title';
import Moment from 'moment/moment';

import { useAppSelector } from '../../../../store';
import { selectCurrentUser, User } from '../../../../api/auth/user/authUserSlice';
import getFullName from '../../../../utils/getFullName';

export default function CabinetPage() {
	const user = useAppSelector(selectCurrentUser) as User;

	return (
		<>
			<div className="text-center">
				<Title level={2}>Вітаємо!</Title>
				<Title level={5}>Ви увійшли до власного електронного кабінету.</Title>
			</div>
			<Descriptions title="Облікові дані" bordered column={24}>
				<Descriptions.Item span={24} label="ПІБ">{getFullName(user)}</Descriptions.Item>
				<Descriptions.Item span={24} label="Email">{user.email}</Descriptions.Item>
				<Descriptions.Item span={24} label="Дата реєстрації">
					{Moment(user.createdAt).format('DD.MM.YYYY HH:mm')}
				</Descriptions.Item>
			</Descriptions>
		</>
	);
}