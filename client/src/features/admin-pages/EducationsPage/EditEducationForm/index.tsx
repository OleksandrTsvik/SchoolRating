import { Form, FormInstance, Select } from 'antd';

import { useGetAllTeachersQuery } from '../../../../api/services/adminTeacherService';
import { useGetAllClassesQuery } from '../../../../api/services/classService';
import { useGetSubjectsQuery } from '../../../../api/services/subjectService';
import getFullName from '../../../../utils/getFullName';
import { FormValues } from '../AddEducation';
import { rules } from '../rules';

const { Option } = Select;

interface Props {
	form: FormInstance<FormValues>;
	onFinish: (values: FormValues) => void;
}

export default function EditEducationForm({ form, onFinish }: Props) {
	const { data: teachers, isFetching: isFetchingTeachers } = useGetAllTeachersQuery();
	const { data: classes, isFetching: isFetchingClasses } = useGetAllClassesQuery();
	const { data: subjects, isFetching: isFetchingSubjects } = useGetSubjectsQuery();

	return (
		<Form
			layout="vertical"
			form={form}
			onFinish={onFinish}
		>
			<Form.Item label="Учитель" name="teacherId" rules={rules.teacherId}>
				<Select placeholder="Виберіть учителя" loading={isFetchingTeachers}>
					{teachers && teachers.map((teacher) => (
						<Option key={teacher.id} value={teacher.id}>{getFullName(teacher)}</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Клас" name="classId" rules={rules.classId}>
				<Select placeholder="Виберіть клас" loading={isFetchingClasses}>
					{classes && classes.map((cls) => (
						<Option key={cls.id} value={cls.id}>{cls.name}</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Предмет" name="subjectId" rules={rules.subjectId}>
				<Select placeholder="Виберіть предмет" loading={isFetchingSubjects}>
					{subjects && subjects.map((subject) => (
						<Option key={subject.id} value={subject.id}>{subject.name}</Option>
					))}
				</Select>
			</Form.Item>
		</Form>
	);
}