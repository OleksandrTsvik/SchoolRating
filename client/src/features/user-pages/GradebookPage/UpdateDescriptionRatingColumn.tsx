import { AutoComplete, Form, Modal, Tooltip } from 'antd';

import {
	useGetDescriptionsQuery,
	useUpdateDescriptionRatingColumnMutation
} from '../../../api/services/teacherService';
import useModal from '../../../hooks/useModal';
import transactionWithNotification from '../../../utils/transactionWithNotification';

export interface FormValues {
	description: string;
}

interface Props {
	description: string | null;
	ratingIds: string[];
	onMouseLeave: () => void;
	onMouseEnter: () => void;
	className: string | undefined;
}

export default function UpdateDescriptionRatingColumn(
	{
		description,
		ratingIds,
		onMouseLeave,
		onMouseEnter,
		className
	}: Props
) {
	const { isOpen, onOpen, onClose } = useModal();
	const [form] = Form.useForm<FormValues>();
	const [updateDescription, { isLoading }] = useUpdateDescriptionRatingColumnMutation();

	const { data: descriptions } = useGetDescriptionsQuery();

	function onOpenModal() {
		form.resetFields();
		form.setFieldValue('description', description);
		onOpen();
	}

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await updateDescription({
					...values,
					ratingIds
				}).unwrap();
				onClose();
			},
			'Вид оцінювання успішно змінено',
			'Виникла помилка при зміні виду оцінювання'
		);

	}

	return (
		<>

			<Tooltip placement="top" title={description} color="geekblue">
				<th
					className={className}
					onClick={onOpenModal}
					onMouseLeave={onMouseLeave}
					onMouseEnter={onMouseEnter}
				>
					<span>{description}</span>
				</th>
			</Tooltip>
			<Modal
				title="Змінити вид оцінювання за урок"
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
						label="Тип оцінки"
						name="description"
						rules={[
							{
								max: 64,
								message: 'Тип оцінки не має перевищувати 64 символи'
							}
						]}
					>
						<AutoComplete
							placeholder="Тип оцінки"
							allowClear={true}
							options={descriptions ? descriptions.map((value) => ({ value })) : []}
							filterOption={(inputValue, option) =>
								option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}