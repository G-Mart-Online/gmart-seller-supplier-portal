import {
  getOrderStatusTagColor,
  getOrderTypeTagColor,
} from "@/utils/orderUtils";
import { Alert, Button, Col, Row, Table, Tag, Tooltip, Typography } from "antd";
import Link from "next/link";
import React from "react";

const { Text } = Typography;

const ManageSupplierOrderContainer = ({
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
      title: "Order No",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => <Text ellipsis>{text}</Text>,
    },
    {
      title: "Customer",
      dataIndex: "supplier",
      key: "supplier",
      render: (seller) => (
        <Text ellipsis>{seller.firstName + " " + seller.lastName}</Text>
      ),
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (type) => <Tag color={getOrderTypeTagColor(type)}>{type}</Tag>,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <Tag color={getOrderStatusTagColor(status)}>{status}</Tag>
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
        <Link href={`orders/${record.orderId}`}>
          <Button type="link">View</Button>
        </Link>
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

export default ManageSupplierOrderContainer;
