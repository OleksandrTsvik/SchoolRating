import { useState } from 'react';
import { DatePicker, Empty, Skeleton, Spin, Tooltip, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import Moment from 'moment';

import { DatePickerUa } from '../../../locale/DatePickerUa';
import { ApiError } from '../../../api/config';
import { useGetDiaryQuery } from '../../../api/services/studentService';
import { IRating } from '../../../models/IRating';
import getFullName from '../../../utils/getFullName';
import FailedRequest from '../../../components/FailedRequest';
import SemestersLinks from '../../../components/SemestersLinks';

import styles from './DiaryPage.module.scss';

const { RangePicker } = DatePicker;

interface DateRange {
	start?: string;
	end?: string;
}

export default function DiaryPage() {
	document.title = 'Щоденник';

	const [dateRange, setDateRange] = useState<DateRange>();

	const { data, isLoading, isFetching, error, refetch } = useGetDiaryQuery({ ...dateRange });

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data) {
		return <Empty description="Дані відсутні" />;
	}

	const matrixRating: IRating[][] = [];
	let maxColumn = 0;

	data.ratings.forEach((rating) => {
		if (
			matrixRating.some((arrRating) => (
				arrRating.some((r) => r.education?.id === rating.education?.id)
			))
		) {
			return;
		}

		let tempArrRating = data.ratings.filter((r) => r.education?.id === rating.education?.id);

		if (tempArrRating.length > 0) {
			matrixRating.push(tempArrRating);
		}

		if (tempArrRating.length > maxColumn) {
			maxColumn = tempArrRating.length;
		}
	});

	function getRatingAverage(ratings: IRating[]): string {
		ratings = ratings.filter((rating) => rating.mark !== null);
		let sum = ratings.reduce((sum, r2) => sum + (r2.mark || 0), 0);
		let result = ratings.length > 0 ? sum / ratings.length : 0;

		return (result).toFixed(2);
	}

	return (
		<>
			<Title level={2} className="text-center">
				Щоденник
			</Title>
			<Spin spinning={isFetching}>
				<SemestersLinks
					className="mb-3"
					semesters={data.semesters}
					onClick={(semester) => {
						setDateRange({
							start: Moment(semester.start).format('YYYY-MM-DD'),
							end: Moment(semester.end).format('YYYY-MM-DD')
						})
					}}
				/>
				<RangePicker
					className="w-100 mb-3"
					defaultValue={[
						dayjs(Moment(data.dateStartRating).format('DD.MM.YYYY'), 'DD.MM.YYYY'),
						dayjs(Moment(data.dateEndRating).format('DD.MM.YYYY'), 'DD.MM.YYYY')
					]}
					locale={DatePickerUa}
					format="DD.MM.YYYY"
					onChange={(dates) => {
						if (dates && dates[0] && dates[1]) {
							setDateRange({
								start: Moment(dates[0].toDate()).format('YYYY-MM-DD'),
								end: Moment(dates[1].toDate()).format('YYYY-MM-DD')
							})
						}
					}}
				/>
				{matrixRating.length === 0
					? <Empty
						description={
							<>
								Оцінки відсутні&nbsp;
								{Moment(data.dateStartRating).format('DD.MM.YYYY')}
								&nbsp;&mdash;&nbsp;
								{Moment(data.dateEndRating).format('DD.MM.YYYY')}
							</>
						}
					/>
					: <div className="table-responsive w-100">
						<table className={styles.table}>
							<thead>
							<tr>
								<th>Предмет та ПІБ учителя</th>
								<th colSpan={maxColumn + 1}>Оцінки</th>
							</tr>
							</thead>
							<tbody>
							{matrixRating.map((arrRating) => (
								<tr key={arrRating[0].id}>
									<th>
										{arrRating[0].education?.subject?.name}
										<br />
										<Typography.Text className="fw-normal">
											{getFullName(arrRating[0].education?.teacher)}
										</Typography.Text>
									</th>
									{arrRating.map((rating) => (
										<Tooltip
											key={rating.id}
											placement="top"
											title={
												<div className="text-center">
													{Moment(rating.date).format('DD.MM.YYYY')}
													<br />
													{rating.description}
												</div>
											}
											color="geekblue"
										>
											<td>
												{rating.isPresence ? rating.mark : 'н'}
											</td>
										</Tooltip>
									))}
									<Tooltip placement="top" title="Середнє арифметичне" color="geekblue">
										<td>{getRatingAverage(arrRating)}</td>
									</Tooltip>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				}
			</Spin>
		</>
	);
}