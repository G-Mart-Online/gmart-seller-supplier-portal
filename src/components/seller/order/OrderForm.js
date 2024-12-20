import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Col, Flex, Form, Row, Steps, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

const { Title } = Typography;

const OrderForm = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [orderDetails, setOrderDetails] = useState({
    sellerId: 123,
    supplierId: null,
    orderType: null,
    orderItems: [],
    orderAddress: {
      address1: null,
      address2: null,
      suburb: null,
      city: null,
      postalCode: null,
      province: null,
    },
    contactNumberOne: null,
    contactNumberTwo: null,
  });
  console.log("user::", user);
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Title level={3}>Order Form</Title>
        <Form>
          <FormItem></FormItem>
        </Form>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Title level={3}>Order Summary</Title>
        <Flex
          vertical
          style={{
            backgroundColor: "#F0F0F0",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <Title level={5}>Supplier</Title>
          <Title level={5}>Order Type</Title>
          <Title level={5}>Products</Title>
          <Title level={5}>Delivery Address</Title>
          <Title level={5}>Contact Information</Title>
          <Title level={5}>Delivery Details</Title>
          <Flex justify="flex-end">
            <Button type="primary">Place Your Order</Button>
          </Flex>
        </Flex>
      </Col>
    </Row>
  ); //
};

export default OrderForm;
