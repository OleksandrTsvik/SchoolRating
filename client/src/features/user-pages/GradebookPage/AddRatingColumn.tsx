import { Button, DatePicker, Form, Modal, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useAddRatingColumnMutation } from '../../../api/services/teacherService';
import useModal from '../../../hooks/useModal';
import transactionWithNotification from '../../../utils/transactionWithNotification';

export interface FormValues {
	date: Date;
}

interface Props {
	educationId: string;
}

export default function AddRatingColumn({ educationId }: Props) {
	const { isOpen, onOpen, onClose } = useModal();
	const [form] = Form.useForm<FormValues>();
	const [addRatingColumn, { isLoading }] = useAddRatingColumnMutation();

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await addRatingColumn({
					...values,
					educationId
				}).unwrap();

				onClose();
				form.resetFields();
			},
			'Колонку успішно додано',
			'Виникла помилка при додаванні колонки'
		);
	}
	
	return (
		<>
			<Tooltip
				title="Додати колонку оцінок"
				placement="right"
			>
				<Button
					className="h-100"
					type="primary"
					style={{ backgroundColor: '#001529' }}
					icon={<PlusOutlined />}
					onClick={onOpen}
				/>
			</Tooltip>
			<Modal
				title="Додати колонку оцінок"
				open={isOpen}
				onCancel={onClose}
				okText="Додати"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={form.submit}
			>
				<Form
					layout="vertical"
					form={form}
					onFinish={onFinish}
				>
					<Form.Item
						hasFeedback
						label="Дата"
						name="date"
						rules={[{
							required: true,
							message: 'Поле "Дата" є обов\'язковим'
						}]}
					>
						<DatePicker
							placeholder="рррр-мм-дд"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Form>

			</Modal>
		</>
	);
}