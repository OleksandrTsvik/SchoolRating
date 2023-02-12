import React, { useRef, useState } from 'react';
import { Button, Input, InputRef, Space } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

type DataIndex<DataType> = keyof DataType;

export default function useColumnSearchProps<DataType>(initFilters: { [key: string]: string | null }) {
	const [filters, setFilters] = useState(initFilters);
	const filterInput = useRef<InputRef>(null);

	function updateFilter(key: string, value: string | null) {
		setFilters(state => ({
			...state,
			[key]: value
		}));
	}

	function onFilter(
		selectedKeys: React.Key[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex<DataType>,
		closeDropdown: boolean = true
	) {
		confirm({ closeDropdown }); // close filter block
		updateFilter(dataIndex as string, selectedKeys[0] as string);
	}

	function resetFilter(
		dataIndex: DataIndex<DataType>,
		confirm: (param?: FilterConfirmProps) => void,
		clearFilters: () => void
	) {
		clearFilters();
		confirm();
		updateFilter(dataIndex as string, null);
	}

	function getColumnSearchProps(
		dataIndex: DataIndex<DataType>,
		placeholder: string = dataIndex as string,
	): ColumnType<DataType> {
		return {
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
				<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
					<Input
						ref={filterInput}
						placeholder={placeholder}
						value={selectedKeys[0]}
						onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => onFilter(selectedKeys, confirm, dataIndex)}
						style={{ marginBottom: 8, display: 'block' }}
					/>
					<Space>
						<Button
							type="primary"
							onClick={() => onFilter(selectedKeys, confirm, dataIndex)}
							icon={<SearchOutlined />}
							size="small"
							style={{ width: 90 }}
						>
							Пошук
						</Button>
						<Button
							onClick={() => clearFilters && resetFilter(dataIndex, confirm, clearFilters)}
							size="small"
							style={{ width: 90 }}
						>
							Скинути
						</Button>
						<Button
							type="link"
							size="small"
							onClick={() => onFilter(selectedKeys, confirm, dataIndex, false)}
						>
							Застосувати
						</Button>
						<Button type="link" size="small" onClick={close}>Закрити</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered: boolean) => (
				<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
			),
			onFilterDropdownOpenChange: (visible) => {
				if (visible) {
					setTimeout(() => filterInput.current?.select(), 100);
				}
			},
			render: (text) => {
				let searchWord = filters[dataIndex as string];
				if (searchWord) {
					return (
						<Highlighter
							highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
							searchWords={[searchWord]}
							autoEscape
							textToHighlight={text || ''}
						/>
					);
				}

				return text;
			}
		};
	}

	return {
		filters,
		filterInput,
		updateFilter,
		onFilter,
		resetFilter,
		getColumnSearchProps
	};
}