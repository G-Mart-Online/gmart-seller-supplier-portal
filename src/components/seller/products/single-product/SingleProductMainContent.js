import { Col, Divider, Row, Typography } from "antd";
import React from "react";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductDetails from "./ProductDetails";

const { Title, Paragraph } = Typography;

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
          <Title level={4} style={{ margin: 0 }}>
            Product Description
          </Title>
        </Divider>
        <Paragraph style={{ fontSize: "16px", lineHeight: "1.6em" }} copyable>
          {product?.description || "No description available for this product."}
        </Paragraph>
      </Col>
    </Row>
  );
};

export default SingleProductMainContent;
