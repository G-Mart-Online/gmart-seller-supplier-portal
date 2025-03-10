import SellerPageContainer from "@/components/seller/SellerPageContainer";
import { ProductFilled } from "@ant-design/icons";
import { Col, Divider, Flex, Row, Typography } from "antd";
import React from "react";
import OrderDetails from "./OrderDetails";

const { Title } = Typography;

const SellerOrderContent = ({ order }) => {
  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Flex
            gap="middle"
            align="center"
            className="seller-page-title-flex"
            style={{ height: "100%" }}
          >
            <ProductFilled />
            <Title level={4} style={{ margin: 0 }}>
              {order?.orderNumber}
            </Title>
          </Flex>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer childern={<OrderDetails order={order} />} />
    </>
  );
};

export default SellerOrderContent;
