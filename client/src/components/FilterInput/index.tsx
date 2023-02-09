import React from 'react';
import { Input } from 'antd';

interface Props {
	title: string;
	onSearch: (
		value: string,
		event?:
			React.ChangeEvent<HTMLInputElement> |
			React.MouseEvent<HTMLElement> |
			React.KeyboardEvent<HTMLInputElement>
	) => void;
}

export default function FilterInput({ title, onSearch }: Props) {
	return (
		<div className="d-flex align-items-center flex-column gap-1">
			{title}
			<Input.Search
				allowClear
				onSearch={onSearch}
			/>
		</div>
	);
}