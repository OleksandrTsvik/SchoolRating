import { DatePicker, Form, Modal } from 'antd';
import Moment from 'moment';
import dayjs from 'dayjs';

import { useUpdateDateRatingColumnMutation } from '../../../api/services/teacherService';
import useModal from '../../../hooks/useModal';
import transactionWithNotification from '../../../utils/transactionWithNotification';

export interface FormValues {
	date: Date;
}

interface Props {
	date: Date;
	ratingIds: string[];
	onMouseLeave: () => void;
	onMouseEnter: () => void;
	className: string | undefined;
}

export default function UpdateDateRatingColumn({ date, ratingIds, onMouseLeave, onMouseEnter, className }: Props) {
	const { isOpen, onOpen, onClose } = useModal();
	const [form] = Form.useForm<FormValues>();
	const [updateDate, { isLoading }] = useUpdateDateRatingColumnMutation();

	function onOpenModal() {
		form.resetFields();
		form.setFieldValue('date', dayjs(Moment(date).format('YYYY-MM-DD'), 'YYYY-MM-DD'));
		onOpen();
	}

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await updateDate({
					date: Moment(dayjs(values.date).toDate()).format('YYYY-MM-DD'),
					ratingIds
				}).unwrap();
				onClose();
			},
			'Дату колонки успішно змінено',
			'Виникла помилка при зміні дати в колонці'
		);

	}

	return (
		<>
			<th
				className={className}
				onClick={onOpenModal}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
			>
				<span>{Moment(date).format('DD.MM.YYYY')}</span>
			</th>
			<Modal
				title="Змінити дату колонки"
				open={isOpen}
				onCancel={onClose}
				okText="Зберегти"
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