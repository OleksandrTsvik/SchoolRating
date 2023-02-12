import { Spin, Table } from "antd";
import { ColumnsType } from 'antd/es/table';

interface Props<RecordType> {
	columns: ColumnsType<RecordType>;
}

export default function LoadingTable<RecordType extends object = any>(
	{ columns }: Props<RecordType>
) {
	return (
		<Spin spinning={true}>
			<Table
				bordered
				pagination={false}
				columns={columns}
				dataSource={[]}
			/>
		</Spin>
	);
}