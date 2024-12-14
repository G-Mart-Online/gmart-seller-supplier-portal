import { Col, Divider, Row, Typography } from "antd";
import React from "react";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductDetails from "./ProductDetails";

const { Paragraph } = Typography;

const SingleProductMainContent = ({ product }) => {
  return (
    <Row gutter={[48, 16]} justify="start">
      <Col xs={24} sm={24} md={24} lg={16} xl={16}>
        <ProductImageCarousel product={product} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <ProductDetails product={product} />
      </Col>
      <Col span={24}>
        <Divider orientation="left" plain>
          Description
        </Divider>
      </Col>
      <Col span={24}>
        <Paragraph copyable style={{ fontSize: "16px" }}>
          {product?.description}
        </Paragraph>
      </Col>
    </Row>
  );
};

export default SingleProductMainContent;
