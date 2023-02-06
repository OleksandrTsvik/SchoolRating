import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default function NotFoundPage() {
	return (
		<div className="h-100 bg-secondary bg-gradient">
			<div className="h-100 p-3 d-flex justify-content-center align-items-center">
				<div className="text-light">
					<h2 className="mt-0">Помилка 404</h2>
					<h1>Сторінку не знайдено</h1>
					<div className="mb-3">
						Неправильно набрано адресу або такої сторінки на сайті не існує.
					</div>
					<Link to="/admin">
						<Button icon={<HomeOutlined />}>Перейти на головну сторінку</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}