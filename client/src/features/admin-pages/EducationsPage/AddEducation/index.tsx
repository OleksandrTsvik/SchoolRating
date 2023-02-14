import { Button, Col, Form, Row, Select } from 'antd';
import { BankOutlined } from '@ant-design/icons';

import { useAddMutation } from '../../../../api/services/educationService';
import { useGetAllTeachersQuery } from '../../../../api/services/adminTeacherService';
import { useGetAllClassesQuery } from '../../../../api/services/classService';
import { useGetSubjectsQuery } from '../../../../api/services/subjectService';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import getFullName from '../../../../utils/getFullName';
import { rules } from '../rules';

const { Option } = Select;

export interface FormValues {
	teacherId: string;
	classId: string;
	subjectId: string;
}

export default function AddEducation() {
	const { data: teachers, isFetching: isFetchingTeachers } = useGetAllTeachersQuery();
	const { data: classes, isFetching: isFetchingClasses } = useGetAllClassesQuery();
	const { data: subjects, isFetching: isFetchingSubjects } = useGetSubjectsQuery();

	const [formAddEducation] = Form.useForm<FormValues>();
	const [addEducation, { isLoading }] = useAddMutation();

	async function onFinishAddEducation(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await addEducation(values).unwrap();
				formAddEducation.resetFields();
			},
			'Новий запис про викладання предмету успішно додано',
			'Виникла помилка при додаванні нового запису про викладання предмету'
		);
	}

	return (
		<>
			<Form
				layout="vertical"
				form={formAddEducation}
				onFinish={onFinishAddEducation}
			>
				<Row gutter={[16, 16]}>
					<Col xs={24} md={24} xl={12}>
						<Form.Item className="m-0" label="Учитель" name="teacherId" rules={rules.teacherId}>
							<Select placeholder="Виберіть учителя" loading={isFetchingTeachers}>
								{teachers && teachers.map((teacher) => (
									<Option key={teacher.id} value={teacher.id}>{getFullName(teacher)}</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} md={12} xl={6}>
						<Form.Item className="m-0" label="Клас" name="classId" rules={rules.classId}>
							<Select placeholder="Виберіть клас" loading={isFetchingClasses}>
								{classes && classes.map((cls) => (
									<Option key={cls.id} value={cls.id}>{cls.name}</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} md={12} xl={6}>
						<Form.Item className="m-0" label="Предмет" name="subjectId" rules={rules.subjectId}>
							<Select placeholder="Виберіть предмет" loading={isFetchingSubjects}>
								{subjects && subjects.map((subject) => (
									<Option key={subject.id} value={subject.id}>{subject.name}</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<div className="text-end mt-3">
				<Button
					type="primary"
					size="large"
					loading={isLoading}
					icon={<BankOutlined />}
					onClick={() => formAddEducation.submit()}
				>
					Додати викладання предмету
				</Button>
			</div>
		</>
	);
}