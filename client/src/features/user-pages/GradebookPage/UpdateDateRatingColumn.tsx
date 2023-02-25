import { useMemo } from 'react';
import { DatePicker, Form, Modal, Tooltip } from 'antd';
import Moment from 'moment';
import dayjs from 'dayjs';

import { DatePickerUa } from '../../../locale/DatePickerUa';
import { useUpdateDateRatingColumnMutation } from '../../../api/services/teacherService';
import useModal from '../../../hooks/useModal';
import transactionWithNotification from '../../../utils/transactionWithNotification';

export interface FormValues {
	date: Date;
}

interface Props {
	date: Date;
	ratingIds: string[];
	studentIds: string[];
	onMouseLeave: () => void;
	onMouseEnter: () => void;
	className: string | undefined;
}

export default function UpdateDateRatingColumn(
	{
		date,
		ratingIds,
		studentIds,
		onMouseLeave,
		onMouseEnter,
		className
	}: Props
) {
	const { isOpen, onOpen, onClose } = useModal();
	const [form] = Form.useForm<FormValues>();
	const [updateDate, { isLoading }] = useUpdateDateRatingColumnMutation();

	const formatDate = useMemo(() => Moment(date).format('DD.MM.YYYY'), [date]);

	function onOpenModal() {
		form.resetFields();
		form.setFieldValue('date', dayjs(formatDate, 'DD.MM.YYYY'));
		onOpen();
	}

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await updateDate({
					date: Moment(dayjs(values.date).toDate()).format('YYYY-MM-DD'),
					studentIds,
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
			<Tooltip placement="top" title={formatDate} color="geekblue">
				<th
					className={className}
					onClick={onOpenModal}
					onMouseLeave={onMouseLeave}
					onMouseEnter={onMouseEnter}
				>
					<span>{formatDate}</span>
				</th>
			</Tooltip>
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
							locale={DatePickerUa}
							placeholder="рррр-мм-дд"
							format="DD.MM.YYYY"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}