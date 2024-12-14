"use client";

import OrderForm from "@/components/seller/order/OrderForm";
import SellerPageContainer from "@/components/seller/SellerPageContainer";
import SellerPageTitle from "@/components/seller/SellerPageTitle";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import React from "react";

const AddOrderPage = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <SellerPageTitle
            icon={<AppstoreAddOutlined />}
            pageTitle="Create Order"
          />
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer childern={<OrderForm />} />
    </>
  );
};

export default AddOrderPage;
