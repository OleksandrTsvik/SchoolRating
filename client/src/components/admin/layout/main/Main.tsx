import { Content } from 'antd/es/layout/layout';

import SubjectsPage from '../../subjects/subjects-page/subjects-page';

import './main.css';

export default function Main() {
	return (
		<Content className="container">
			<div className="wrapper">
				<SubjectsPage/>
			</div>
		</Content>
	);
}