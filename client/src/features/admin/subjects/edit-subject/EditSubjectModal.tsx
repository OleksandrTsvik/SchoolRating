import { FormInstance, Modal } from 'antd';

import SubjectForm, { FormValues } from '../add-edit-subject-form/SubjectForm';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	isLoading: boolean;
	formEditSubject: FormInstance<FormValues>;
	onFinishEditSubject: (values: FormValues) => void;
}

export default function EditSubjectModal(
	{
		isOpen,
		onClose,
		isLoading,
		formEditSubject,
		onFinishEditSubject
	}: Props
) {
	return (
		<Modal
			title="Редагування предмету"
			open={isOpen}
			onCancel={onClose}
			okText="Зберегти зміни"
			cancelText="Скасувати"
			confirmLoading={isLoading}
			onOk={formEditSubject.submit}
		>
			<SubjectForm
				form={formEditSubject}
				onFinish={onFinishEditSubject}
			/>
		</Modal>
	);
}