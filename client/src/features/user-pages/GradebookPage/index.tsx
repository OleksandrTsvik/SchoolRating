import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker, Empty, Skeleton, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import Moment from 'moment/moment';

import { DatePickerUa } from '../../../locale/DatePickerUa';
import { ApiError } from '../../../api/config';
import { useGetGradebookQuery } from '../../../api/services/teacherService';
import FailedRequest from '../../../components/FailedRequest';
import SemestersLinks from '../../../components/SemestersLinks';
import TableWithoutRating from './TableWithoutRating';
import TableRating from './TableRating';
import AddRatingColumn from './AddRatingColumn';

import styles from './GradebookPage.module.scss';

const { RangePicker } = DatePicker;

interface DateRange {
	start?: string;
	end?: string;
}

export default function GradebooksPage() {
	const { id } = useParams();
	const [dateRange, setDateRange] = useState<DateRange>();

	const { data, isLoading, isFetching, error, refetch } = useGetGradebookQuery({ ...dateRange, id: id as string });

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data || !data.education.cls || data.education.cls.students.length === 0) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<>
			<Title level={2} className="text-center">
				{data.education.cls.name}. {data.education.subject?.name}
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
				<div className="d-flex gap-1">
					<div className="table-responsive w-100">
						{data.education.ratings.length === 0
							? <TableWithoutRating students={data.education.cls.students} />
							: <TableRating data={data.education} />
						}
					</div>
					<div className={styles.btnWrapper}>
						<AddRatingColumn education={data.education} />
					</div>
				</div>
			</Spin>
		</>
	);
}