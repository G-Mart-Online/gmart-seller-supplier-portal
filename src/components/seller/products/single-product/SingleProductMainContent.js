import { Col, Row } from "antd";
import React from "react";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductDetails from "./ProductDetails";

const SingleProductMainContent = ({ product }) => {
  return (
    <Row gutter={[16, 16]} justify="start">
      <Col xs={24} sm={24} md={12} lg={12} xl={8}>
        <ProductImageCarousel images={product} />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={16}>
        <ProductDetails product={product} />
      </Col>
    </Row>
  );
};

export default SingleProductMainContent;
