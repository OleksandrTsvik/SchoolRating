import { Button, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import useModal from '../../../../hooks/useModal';
import UserForm, { FormValues } from '../../../../components/UserForm';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import { useAddMutation } from '../../../../api/services/adminStudentService';

export default function AddStudent() {
	const { isOpen, onOpen, onClose } = useModal();
	const [formAddStudent] = Form.useForm<FormValues>();
	const [addStudent, { isLoading }] = useAddMutation();

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await addStudent(values).unwrap();
				closeModal();
			},
			'Нового учня успішно додано',
			'Виникла помилка при додаванні нового учня'
		);
	}

	function closeModal() {
		onClose();
		formAddStudent.resetFields();
	}

	return (
		<>
			<div className="text-end mb-3">
				<Button
					size="large"
					icon={<PlusOutlined />}
					onClick={onOpen}
				>
					Додати учня
				</Button>
			</div>
			<Modal
				title="Новий учень"
				open={isOpen}
				onCancel={closeModal}
				okText="Додати"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={formAddStudent.submit}
			>
				<UserForm
					form={formAddStudent}
					onFinish={onFinish}
					isPasswordRequired={true}
				/>
			</Modal>
		</>
	);
}