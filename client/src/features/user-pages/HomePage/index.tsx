import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

import admin from '../../../assets/admin.png';
import diary from '../../../assets/diary.png';
import classBook from '../../../assets/class-book.jpg';

import styles from './HomePage.module.scss';

export default function HomePage() {
	const cards = [
		{ text: 'Адмін-панель', link: '/admin', img: admin },
		{ text: 'Щоденник для учнів', link: '/', img: diary },
		{ text: 'Класний журнал', link: '/', img: classBook }
	];

	return (
		<>
			<Row className="align-items-center" gutter={[16, 16]}>
				{cards.map((card, index) => (
					<Col key={index} xs={24} md={12} xl={8}>
						<Link to={card.link}>
							<Card
								hoverable
								cover={<img
									className={styles.cardImg}
									src={card.img}
									alt={card.text}
								/>}
							>
								<Meta
									className={styles.cardMeta}
									title={card.text}
								/>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
}