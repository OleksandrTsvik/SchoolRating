import { Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export default function confirmDelete(
	title: string,
	content: string,
	onOk: () => void
) {
	confirm({
		type: 'warning',
		title,
		icon: <WarningOutlined />,
		content: (
			<>
				<p>{content}</p>
				<p className="text-muted">Дану дію скасувати неможливо.</p>
			</>
		),
		okText: 'Так, видалити',
		okType: 'danger',
		cancelText: 'Скасувати',
		onOk
	});
}