import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default function NotFoundPage() {
	return (
		<div className="h-100 bg-secondary bg-gradient">
			<div className="h-100 p-3 d-flex justify-content-center align-items-center">
				<div className="text-light">
					<h2 className="mt-0">Oops!</h2>
					<h1>404 Not Found</h1>
					<div className="mb-3">
						Sorry, an error has occurred, Requested page not found!
					</div>
					<Link to="/admin">
						<Button icon={<HomeOutlined />}>Home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}