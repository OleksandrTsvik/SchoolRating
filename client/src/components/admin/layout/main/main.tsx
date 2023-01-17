import { Breadcrumb } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function Main() {
	return (
		<Content style={{ margin: '0 16px', background: '#F5F5F5' }}>
			<Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>User</Breadcrumb.Item>
				<Breadcrumb.Item>Bill</Breadcrumb.Item>
			</Breadcrumb>
			<div style={{ padding: 24, minHeight: 2360, background: '#FFFFFF' }}>
				Bill is a cat.
			</div>
		</Content>
	);
}