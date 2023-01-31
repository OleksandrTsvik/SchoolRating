import { Button } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
	id: string;
	name: string;
	onClick: () => void;
}

export default function DeleteSubject({ id, name, onClick }: Props) {
	return (
		<Button
			type="primary"
			danger
			size="large"
			icon={<DeleteOutlined />}
			onClick={onClick}
		/>
	);
}