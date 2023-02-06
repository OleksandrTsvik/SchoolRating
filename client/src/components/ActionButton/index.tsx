import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ButtonType } from 'antd/es/button/buttonHelpers';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface Props {
	action: 'edit' | 'delete',
	type?: ButtonType;
	size?: SizeType;
	onClick: () => void;
}

export default function ActionButton(
	{
		action,
		type = 'primary',
		size = 'large',
		onClick
	}: Props
) {
	let danger = false;
	let icon = <EditOutlined />;

	if (action === 'delete') {
		danger = true;
		icon = <DeleteOutlined />;
	}

	return (
		<Button
			type={type}
			danger={danger}
			size={size}
			icon={icon}
			onClick={onClick}
		/>
	);
}