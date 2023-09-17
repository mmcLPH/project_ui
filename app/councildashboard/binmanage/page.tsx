'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Space } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";


const EditableContext = React.createContext<FormInstance<any> | null>(null);
  const col = [
    {
      title: 'bin id',
      dataIndex: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      sortDirections: ['descend'],
    },
    {
      title: 'bin name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['descend'],
    },
    {
      title: 'bin type',
      dataIndex: 'type',
    },
    {
      title: 'action',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]

interface Item {
    id: string;
  key: string;
  name: string;
  age: string;
  address: string;
  type: string;
  color: string;
}



interface EditableRowProps {
  index: number;
}



const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
  const router = useRouter()
  const [dataSource, setDataSource] = useState<DataType[]>( [
    {
      'id':'1',
      'name': 'a-bin1',
      'type': "General-Waste-Bin",
      "image": "/images/bins/rubbish.png",
      "lid": ["red"],
    },
    {
      'id':'2',
      'name': 'b-bin2',
      "type": "Recycling-Bin",
      "image": "/images/bins/recycling.png",
      "lid": ["yellow"],
    },
    {
      'id':'3',
      'name': 'c-bin3',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
    {
      'id':'4',
      'name': 'd-bin4',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
    {
      'id':'5',
      'name': 'e-bin5',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
    {
      'id':'6',
      'name': 'f-bin6',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
    {
      'id':'7',
      'name': 'g-bin7',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
    {
      'id':'8',
      'name': 'h-bin',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
    {
      'id':'9',
      'name': 'i-bin',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
    {
      'id':'10',
      'name': 'j-bin4',
      "type": "Glass-Recycling-Bin",
      "image": "/images/bins/glass.png",
      "lid": ["purple"],
    },
  ]);

  const [count, setCount] = useState(2);
  const toCouncildashboard =()=>{
    router.push('./councildashboard')
  }

  const handleDelete = (id: string) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'bin id',
      dataIndex: 'id',
      width: '30%',
      editable: true,
    },
    {
      title: 'bin name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'bin type',
      dataIndex: 'type',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record: { id: string }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      id: `id ${count}`,
      name: `new bin ${count}`,
      type: 'default type',
    //   address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <div className={styles.title}>
        <h1> Bin management </h1>
      </div>
      <div className={styles.item}>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> 
      </div>
      
      <Button className={styles.back} style={{ marginBottom: 16, marginTop: 10 }} type="primary"  onClick={toCouncildashboard}>
        back
      </Button>

      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;