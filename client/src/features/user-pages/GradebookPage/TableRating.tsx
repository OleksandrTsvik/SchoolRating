import React, { useMemo, useState } from 'react';
import { Form, Modal, Radio, Typography } from 'antd';
import Moment from 'moment/moment';

import { useUpdateRatingMutation } from '../../../api/services/teacherService';
import { IEducation } from '../../../models/IEducation';
import { IRating } from '../../../models/IRating';
import useModal from '../../../hooks/useModal';
import getFullName from '../../../utils/getFullName';
import transactionWithNotification from '../../../utils/transactionWithNotification';
import RemoveRatingColumn from './RemoveRatingColumn';
import UpdateDateRatingColumn from './UpdateDateRatingColumn';
import UpdateDescriptionRatingColumn from './UpdateDescriptionRatingColumn';

import styles from './GradebookPage.module.scss';

interface Props {
	data: IEducation;
}

interface FormValues {
	id: string;
	isPresence: boolean;
	mark: number | null;
	fullName: string;
	date: string;
}

export default function TableRating({ data }: Props) {
	const { isOpen, onOpen, onClose } = useModal();
	const [form] = Form.useForm<FormValues>();
	const isPresenceValue = Form.useWatch('isPresence', form);
	const markValue = Form.useWatch('mark', form);
	const [updateRating, { isLoading }] = useUpdateRatingMutation();

	const [hoverColumn, setHoverColumn] = useState(-1);
	const matrixRating: Omit<IRating, 'education'>[][] = [];

	const studentIds = useMemo(() => data.cls!.students.map((student) => student.id), [data]);

	data.cls?.students.forEach((student) => {
		matrixRating.push(data.ratings.filter((rating) => rating?.student?.id === student.id));
	});

	function onOpenModal(rating: Omit<IRating, 'education'>) {
		form.resetFields();
		form.setFieldsValue({
			id: rating.id,
			isPresence: rating.isPresence,
			mark: rating.isPresence ? rating.mark : null,
			fullName: getFullName(rating.student),
			date: Moment(rating.date).format('DD.MM.YYYY')
		});
		onOpen();
	}

	function onChangeValuesForm(_: any, values: FormValues) {
		form.setFieldValue('mark', values.isPresence ? values.mark : null);
	}

	function onToggleMark() {
		form.setFieldValue('mark', markValue ? null : markValue);
	}

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await updateRating({
					...values,
					id: form.getFieldValue('id')
				}).unwrap();
				onClose();
			},
			'Оцінка успішно змінена',
			'Виникла помилка при зміні оцінки'
		);
	}

	function mouseLeaveHoverColumn() {
		setHoverColumn(-1);
	}

	return (
		<>
			<table className={styles.table}>
				<thead>
				<tr>
					<th rowSpan={2}>#</th>
					<th rowSpan={2}>ПІБ</th>
					{matrixRating[0].map((rating, index) => {
						const ratingIds = matrixRating.map((rating) => rating[index]?.id);

						return (
							<React.Fragment key={rating.id}>
								<UpdateDateRatingColumn
									date={rating.date}
									ratingIds={ratingIds}
									studentIds={studentIds}
									onMouseLeave={mouseLeaveHoverColumn}
									onMouseEnter={() => setHoverColumn(index)}
									className={hoverColumn === index ? styles.columnHover : ''}
								/>
								<UpdateDescriptionRatingColumn
									description={rating.description}
									ratingIds={ratingIds}
									onMouseLeave={mouseLeaveHoverColumn}
									onMouseEnter={() => setHoverColumn(index)}
									className={hoverColumn === index ? styles.columnHover : ''}
								/>
							</React.Fragment>
						);
					})}
				</tr>
				<tr>
					{matrixRating[0].map((rating, index) => (
						<td
							key={rating.id}
							colSpan={2}
							onMouseLeave={mouseLeaveHoverColumn}
							onMouseEnter={() => setHoverColumn(index)}
							className={hoverColumn === index ? styles.columnHover : ''}
						>
							<RemoveRatingColumn
								date={Moment(rating.date).format('DD.MM.YYYY')}
								ratingIds={matrixRating.map((rating) => rating[index]?.id)}
							/>
						</td>
					))}
				</tr>
				</thead>
				<tbody>
				{matrixRating.map((arrRating, index) => (
					<tr key={arrRating[0]?.id}>
						<td>{index + 1}</td>
						<td>{getFullName(arrRating[0]?.student)}</td>
						{arrRating.map((rating, i) => (
							<td
								key={rating.id}
								colSpan={2}
								className={`text-center ${hoverColumn === i ? styles.columnHover : ''}`}
								onMouseLeave={mouseLeaveHoverColumn}
								onMouseEnter={() => setHoverColumn(i)}
								onClick={() => onOpenModal(rating)}
							>
								{rating.isPresence ? rating.mark : 'н'}
							</td>
						))}
					</tr>
				))}
				</tbody>
			</table>
			<Modal
				title={`Поставити оцінку учню ${form.getFieldValue('fullName')} за ${form.getFieldValue('date')}`}
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
					onValuesChange={onChangeValuesForm}
				>
					<Form.Item
						hasFeedback
						label="Відвідування"
						name="isPresence"
						rules={[{
							required: true,
							message: 'Поле "Відвідування" є обов\'язковим'
						}]}
					>
						<Radio.Group buttonStyle="solid">
							<Radio.Button value={true}>Присутній</Radio.Button>
							<Radio.Button value={false}>Відсутній</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						hasFeedback
						label={isPresenceValue ? "Оцінка" : <Typography.Text disabled>Оцінка</Typography.Text>}
						name="mark"
					>
						<Radio.Group
							disabled={!isPresenceValue}
							buttonStyle="solid"
							className={styles.marks}
						>
							{Array(12).fill(null).map((_, i) => (
								<Radio.Button
									key={i}
									value={i + 1}
									style={{ borderRadius: 0 }}
									onClick={onToggleMark}
								>
									{i + 1}
								</Radio.Button>
							))}
						</Radio.Group>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}