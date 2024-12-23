import {
  Alert,
  Button,
  Col,
  Divider,
  Flex,
  List,
  Modal,
  Row,
  Typography,
} from "antd";
import Image from "next/image";
import React from "react";

const { Title, Text } = Typography;

const OrderSummaryModal = ({
  visible,
  onCancel,
  onPlaceOrder,
  orderDetails,
  supplier,
  shippingCharges,
  confirmLoading,
  orderCreationError,
}) => {
  const { orderType, orderItems } = orderDetails;

  const itemTotal = orderItems.reduce((sum, item) => sum + item.amount, 0);
  const grandTotal = itemTotal + shippingCharges;

  return (
    <Modal
      open={visible}
      title={<Title level={4}>Order Summary</Title>}
      onCancel={onCancel}
      onOk={onPlaceOrder}
      confirmLoading={confirmLoading}
      width={1000}
    >
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Text strong>Supplier:</Text> <Text>{supplier?.companyName}</Text>
        </Col>
        <Col>
          <Text strong>Order Type:</Text> <Text>{orderType}</Text>
        </Col>
      </Row>
      <Divider />

      <Title level={5}>Order Items</Title>
      <List
        dataSource={orderItems}
        renderItem={(item) => (
          <List.Item>
            <Row gutter={16} style={{ width: "100%" }} align="middle">
              <Col xs={2}>
                <Image
                  src={item.imgUrls[0]}
                  width={50}
                  height={50}
                  alt={item.name}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </Col>
              <Col xs={24} sm={22}>
                <Flex vertical>
                  <Text>{item.name}</Text>
                  <Text type="secondary">
                    {orderType === "wholesale"
                      ? `Rs. ${item.wholesalePrice.toFixed(2)} x ${
                          item.quantity
                        } = Rs. {item.amount.toFixed(2)}`
                      : `Rs. ${item.retailPrice.toFixed(2)} x ${
                          item.quantity
                        } = Rs. ${item.amount.toFixed(2)}`}
                  </Text>
                </Flex>
              </Col>
            </Row>
          </List.Item>
        )}
        bordered
        style={{ marginBottom: 16 }}
      />

      <Row justify="end" style={{ marginTop: 16 }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row justify="space-between">
            <Col>
              <Text strong>Items Total:</Text>
            </Col>
            <Col>
              <Text>Rs. {itemTotal.toFixed(2)}</Text>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col>
              <Text strong>Shipping Charges:</Text>
            </Col>
            <Col>
              <Text>Rs. {shippingCharges.toFixed(2)}</Text>
            </Col>
          </Row>
          <Divider />
          <Row justify="space-between">
            <Col>
              <Title level={5}>Grand Total:</Title>
            </Col>
            <Col>
              <Title level={5}>Rs. {grandTotal.toFixed(2)}</Title>
            </Col>
          </Row>
        </Col>
        {orderCreationError && (
          <Col span={24}>
            <Alert type="error" message={orderCreationError} banner />
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default OrderSummaryModal;
