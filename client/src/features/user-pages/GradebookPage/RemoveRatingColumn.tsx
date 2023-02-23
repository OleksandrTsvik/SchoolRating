import { Button, Popconfirm } from 'antd';
import { ExclamationCircleOutlined, MinusOutlined } from '@ant-design/icons';

import { useRemoveRatingColumnMutation } from '../../../api/services/teacherService';
import useModal from '../../../hooks/useModal';
import transactionWithNotification from '../../../utils/transactionWithNotification';

interface Props {
	date: string;
	ratingIds: string[];
}

export default function RemoveRatingColumn({ date, ratingIds }: Props) {
	const { isOpen, onToggle, onClose } = useModal();
	const [removeColumn, { isLoading }] = useRemoveRatingColumnMutation();

	async function confirm() {
		await transactionWithNotification(
			async () => await removeColumn({ ratingIds }).unwrap(),
			'Колонку успішно видалено',
			'Виникла помилка при видаленні колонки'
		);

	}

	return (
		<Popconfirm
			title="Видалити колонку оцінок?"
			description={`Ви дійсно бажаєте видалити оцінки за ${date}?`}
			okText="Так, видалити"
			cancelText="Скасувати"
			open={isOpen}
			okButtonProps={{ loading: isLoading }}
			onOpenChange={onToggle}
			onCancel={onClose}
			onConfirm={confirm}
			icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
		>
			<Button
				danger={true}
				icon={<MinusOutlined />}
				loading={isLoading}
				style={{ width: '100%', height: 'auto', padding: 0 }}
			/>
		</Popconfirm>
	);
}