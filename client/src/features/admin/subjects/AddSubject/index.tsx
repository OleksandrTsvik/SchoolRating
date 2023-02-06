import { BookOutlined } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';

import useModal from '../../../../hooks/useModal';
import { useAddMutation } from '../../../../api/services/subjectService';
import SubjectForm, { FormValues } from '../SubjectForm';
import transactionWithNotification from '../../../../utils/transactionWithNotification';

export default function AddSubject() {
	const { isOpen, onOpen, onClose } = useModal();
	const [formAddSubject] = Form.useForm();
	const [addSubject, { isLoading }] = useAddMutation();

	async function onFinishAddSubject(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await addSubject(values).unwrap();
				onClose();
				formAddSubject.resetFields();
			},
			'Новий предмет успішно додано',
			'Виникла помилка при додаванні нового предмету'
		);
	}

	return (
		<>
			<div className="text-end mb-3">
				<Button
					type="primary"
					size="large"
					icon={<BookOutlined />}
					onClick={onOpen}
				>
					Додати новий предмет
				</Button>
			</div>
			<Modal
				title="Новий предмет"
				open={isOpen}
				onCancel={onClose}
				okText="Додати"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={formAddSubject.submit}
			>
				<SubjectForm
					form={formAddSubject}
					onFinish={onFinishAddSubject}
				/>
			</Modal>
		</>
	);
}