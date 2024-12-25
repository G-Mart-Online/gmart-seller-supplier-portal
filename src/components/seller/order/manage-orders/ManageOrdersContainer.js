import React from "react";
import { Table, Tag, Typography, Button, Row, Col, Tooltip, Alert } from "antd";

const { Text } = Typography;

const ManageOrdersContainer = ({
  orders,
  isLoading,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  error,
}) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <Text ellipsis>{text}</Text>,
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      render: (supplier) => supplier.companyName,
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (type) => (
        <Tag color={type === "WHOLESALE" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <Tag
          color={
            status === "CREATED"
              ? "orange"
              : status === "COMPLETED"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `Rs. ${price.toFixed(2)}`,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdateDate",
      key: "lastUpdateDate",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const formattedTime = new Date(date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return (
          <Tooltip title={`${formattedDate} at ${formattedTime}`}>
            <Text>
              {new Date(date).toLocaleDateString()}{" "}
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {new Date(date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Text>
          </Tooltip>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Button type="link" onClick={() => console.log("record::", record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Row justify="center">
      <Col span={24}>
        {error ? (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            banner
          />
        ) : (
          <Table
            dataSource={orders}
            columns={columns}
            rowKey={(record) => record.orderId}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalItems,
              onChange: (page, size) => onPageChange(page, size),
              showSizeChanger: true,
            }}
            scroll={{ x: 800 }}
            bordered
          />
        )}
      </Col>
    </Row>
  );
};

export default ManageOrdersContainer;
