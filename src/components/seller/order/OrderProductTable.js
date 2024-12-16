import { formatOptions } from "@/utils/supplierUtils";
import {
  Button,
  Col,
  Flex,
  Form,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import Image from "next/image";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const EditableContext = createContext(null);

const OrderProductTable = ({
  form,
  products,
  dataSource,
  setDataSource,
  count,
  setCount,
}) => {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductOption, setSelectedProductOption] = useState(null);

  const EditableRow = ({ index, ...props }) => {
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        if (dataIndex === "quantity" && values.quantity < 1) {
          throw new Error("Quantity must be at least 1.");
        }
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.error("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            { required: true, message: `${title} is required.` },
            { type: "number", min: 1, message: "Quantity must be at least 1." },
          ]}
        >
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "Product",
      dataIndex: "productName",
      width: "30%",
      render: (_, record) => (
        <Flex gap="middle" align="center">
          <Image
            src={record?.imageUrls[0]}
            alt="product-img"
            width={50}
            height={50}
            style={{ borderRadius: "6px" }}
          />
          <Typography>{record.productName}</Typography>
        </Flex>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "Unit Price (Rs)",
      dataIndex: "retailPrice",
    },
    {
      title: "Amount (Rs)",
      dataIndex: "amount",
      render: (_, record) => (
        <Typography prefix="Rs.">
          {record.quantity * record.retailPrice}
        </Typography>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const item = products.find(
      (product) => product.productId === selectedProductOption
    );
    const newData = {
      key: count,
      quantity: 1,
      ...item,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);

    setSelectedProductOption(null);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    console.log("new data::", newData);
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
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  useEffect(() => {
    if (products) {
      setProductOptions(formatOptions(products, "productId", "productName"));
    }
  }, [products]);

  console.log("products::", products);
  console.log("productOptions", productOptions);

  return (
    <>
      <Col span={24}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          title={() => (
            <>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Flex gap="small">
                  <Select
                    className="seller-order-supplier-search"
                    showSearch
                    placeholder="Select a product"
                    optionFilterProp="label"
                    defaultOpen
                    autoFocus
                    allowClear
                    value={selectedProductOption}
                    onChange={(value) => {
                      setSelectedProductOption(value);
                      console.log("Selected product:", value);
                    }}
                    onClear={() => setSelectedProductOption(null)}
                    options={productOptions}
                  />

                  <Button
                    type="primary"
                    onClick={handleAdd}
                    disabled={!selectedProductOption}
                  >
                    Add Product
                  </Button>
                </Flex>
              </Col>
            </>
          )}
        />
      </Col>
    </>
  );
};

export default OrderProductTable;
