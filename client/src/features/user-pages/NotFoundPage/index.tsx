import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function NotFoundPage() {
	return (
		<Result
			status="404"
			title="Помилка 404. Сторінку не знайдено"
			subTitle="Неправильно набрано адресу або такої сторінки на сайті не існує."
			extra={(
				<Link to="/">
					<Button type="default">Перейти на головну сторінку</Button>
				</Link>
			)}
		/>
	);
}