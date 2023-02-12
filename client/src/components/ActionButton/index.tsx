import { Button } from 'antd';
import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ButtonType } from 'antd/es/button/buttonHelpers';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface Props {
	action: 'edit' | 'delete' | 'minus' | 'plus',
	type?: ButtonType;
	size?: SizeType;
	isLoading?: boolean;
	onClick: () => void;
}

export default function ActionButton(
	{
		action,
		type = 'primary',
		size = 'large',
		isLoading = false,
		onClick
	}: Props
) {
	let danger, icon;

	switch (action) {
		case 'delete':
			danger = true;
			icon = <DeleteOutlined />;
			break;
		case 'minus':
			danger = true;
			icon = <MinusOutlined />;
			break;
		case 'plus':
			danger = false;
			icon = <PlusOutlined />;
			break;
		default:
			danger = false;
			icon = <EditOutlined />;
	}

	return (
		<Button
			type={type}
			danger={danger}
			size={size}
			icon={icon}
			loading={isLoading}
			onClick={onClick}
		/>
	);
}