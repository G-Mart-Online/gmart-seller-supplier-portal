import { Col, Flex, Form, Input, Row, Table, Typography } from "antd";
import Image from "next/image";
import React from "react";

const { Text, Title, Paragraph } = Typography;

const OrderDetails = ({ order }) => {
  const dataSource = order.orderItems.map((item, index) => ({
    ...item,
    key: item.product.productId || index,
  }));

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      width: "100",
      render: (_, record) => (
        <Flex gap="small" align="center">
          <Image
            src={record.product.imageUrls[0]}
            width={50}
            height={50}
            style={{ borderRadius: "12px" }}
            alt="product-img"
          />
          <Text>{record.product.productName}</Text>
        </Flex>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "100",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      width: "100",
      render: (_, record) => {
        return order?.orderType === "WHOLESALE"
          ? `Rs. ${record?.product?.wholesalePrice?.toFixed(2)}`
          : `Rs. ${record?.product?.retailPrice?.toFixed(2)}`;
      },
    },

    {
      title: "Amount",
      dataIndex: "totalItemPrice",
      width: "100",
      fixed: "right",
      render: (totalItemPrice) => `Rs. ${totalItemPrice.toFixed(2)}`,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form size="large" layout="vertical" disabled initialValues={order}>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label="Supplier" name={["supplier", "companyName"]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label="Order Type" name="orderType">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Table
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{
                  x: "max-content",
                }}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      <Title level={5}>Description</Title>
                      <Paragraph type="secondary" style={{ margin: 0 }}>
                        {record?.product?.description}
                      </Paragraph>
                    </>
                  ),
                  rowExpandable: (record) => !!record?.product?.description,
                }}
                footer={() => {
                  return (
                    <Flex justify="space-between" align="center">
                      <Title level={5} style={{ margin: 0 }}>
                        Total Amount
                      </Title>
                      <Text strong>Rs. {order?.totalPrice?.toFixed(2)}</Text>
                    </Flex>
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <Title level={5} style={{ paddingTop: "20px" }}>
                Address
              </Title>
              <Row gutter={[16, 0]}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label="Address Line 1"
                    name={["orderAddress", "address1"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label="Address Line 2"
                    name={["orderAddress", "address2"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Suburb" name={["orderAddress", "suburb"]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="City" name={["orderAddress", "city"]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label="Postal Code"
                    name={["orderAddress", "postalCode"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label="Province"
                    name={["orderAddress", "province"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Title level={5}>Contact</Title>
              <Row gutter={[16, 0]}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Contact No. (1)" name="contactNumberOne">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item label="Contact No. (2)" name="contactNumberTwo">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default OrderDetails;
