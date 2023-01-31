import { Button } from 'antd';
import { EditOutlined } from "@ant-design/icons";

interface Props {
	onClick: () => void;
}

export default function EditSubject({ onClick }: Props) {
	return (
		<Button
			type="primary"
			size="large"
			icon={<EditOutlined />}
			onClick={onClick}
		/>
	);
}