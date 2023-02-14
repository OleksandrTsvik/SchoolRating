import { Button, Form, Modal } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import { useAddMutation } from '../../../../api/services/classService';
import useModal from '../../../../hooks/useModal';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import ClassForm, { FormValues } from '../ClassForm';

export default function AddClass() {
	const { isOpen, onOpen, onClose } = useModal();
	const [form] = Form.useForm<FormValues>();
	const [addClass, { isLoading }] = useAddMutation();

	async function onFinishAddClass(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await addClass(values).unwrap();
				onClose();
				form.resetFields();
			},
			'Новий клас успішно додано',
			'Виникла помилка при додаванні нового класу'
		);
	}

	return (
		<>
			<div className="text-end mb-3">
				<Button
					type="primary"
					size="large"
					icon={<TeamOutlined />}
					onClick={onOpen}
				>
					Додати новий клас
				</Button>
			</div>
			<Modal
				title="Новий клас"
				open={isOpen}
				onCancel={onClose}
				okText="Додати"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={form.submit}
			>
				<ClassForm
					form={form}
					onFinish={onFinishAddClass}
				/>
			</Modal>
		</>
	);
}