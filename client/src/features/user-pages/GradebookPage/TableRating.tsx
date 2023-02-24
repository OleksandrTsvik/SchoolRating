import React, { useState } from 'react';
import Moment from 'moment/moment';

import { IEducation } from '../../../models/IEducation';
import { IRating } from '../../../models/IRating';
import getFullName from '../../../utils/getFullName';
import RemoveRatingColumn from './RemoveRatingColumn';
import UpdateDateRatingColumn from './UpdateDateRatingColumn';
import UpdateDescriptionRatingColumn from './UpdateDescriptionRatingColumn';

import styles from './GradebookPage.module.scss';

interface Props {
	data: IEducation;
}

export default function TableRating({ data }: Props) {
	const [hoverColumn, setHoverColumn] = useState(-1);
	const matrixRating: Omit<IRating, 'education'>[][] = [];

	data.cls?.students.forEach((student) => {
		matrixRating.push(data.ratings.filter((rating) => rating.student.id === student.id));
	});

	function mouseLeaveHoverColumn() {
		setHoverColumn(-1);
	}

	return (
		<table className={styles.table}>
			<thead>
			<tr>
				<th rowSpan={2}>#</th>
				<th rowSpan={2}>ПІБ</th>
				{matrixRating[0].map((rating, index) => {
					const ratingIds = matrixRating.map((rating) => rating[index].id);

					return (
						<React.Fragment key={rating.id}>
							<UpdateDateRatingColumn
								date={rating.date}
								ratingIds={ratingIds}
								onMouseLeave={mouseLeaveHoverColumn}
								onMouseEnter={() => setHoverColumn(index)}
								className={hoverColumn === index ? styles.columnHover : ''}
							/>
							<UpdateDescriptionRatingColumn
								description={rating.description}
								ratingIds={ratingIds}
								onMouseLeave={mouseLeaveHoverColumn}
								onMouseEnter={() => setHoverColumn(index)}
								className={hoverColumn === index ? styles.columnHover : ''}
							/>
						</React.Fragment>
					);
				})}
			</tr>
			<tr>
				{matrixRating[0].map((rating, index) => (
					<td
						key={rating.id}
						colSpan={2}
						onMouseLeave={mouseLeaveHoverColumn}
						onMouseEnter={() => setHoverColumn(index)}
						className={hoverColumn === index ? styles.columnHover : ''}
					>
						<RemoveRatingColumn
							date={Moment(rating.date).format('DD.MM.YYYY')}
							ratingIds={matrixRating.map((rating) => rating[index].id)}
						/>
					</td>
				))}
			</tr>
			</thead>
			<tbody>
			{matrixRating.map((arrRating, index) => (
				<tr key={arrRating[0].id}>
					<td>{index + 1}</td>
					<td>{getFullName(arrRating[0].student)}</td>
					{arrRating.map((rating, i) => (
						<td
							onMouseLeave={mouseLeaveHoverColumn}
							onMouseEnter={() => setHoverColumn(i)}
							key={rating.id}
							colSpan={2}
							className={`text-center ${hoverColumn === i ? styles.columnHover : ''}`}
						>
							{rating.isPresence ? rating.mark : 'н'}
						</td>
					))}
				</tr>
			))}
			</tbody>
		</table>
	);
}