import { Button, DatePicker, Form, Modal, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { DatePickerUa } from '../../../locale/DatePickerUa';
import { useAddRatingColumnMutation } from '../../../api/services/teacherService';
import useModal from '../../../hooks/useModal';
import transactionWithNotification from '../../../utils/transactionWithNotification';
import { IEducation } from '../../../models/IEducation';

export interface FormValues {
	date: Date;
}

interface Props {
	education: IEducation;
}

export default function AddRatingColumn({ education }: Props) {
	const { isOpen, onOpen, onClose } = useModal();
	const [form] = Form.useForm<FormValues>();
	const [addRatingColumn, { isLoading }] = useAddRatingColumnMutation();

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await addRatingColumn({
					...values,
					studentIds: education.cls!.students.map((student) => student.id),
					educationId: education.id
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
							locale={DatePickerUa}
							placeholder="рррр-мм-дд"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Form>

			</Modal>
		</>
	);
}