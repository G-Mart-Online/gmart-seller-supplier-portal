import { Button, Col, Flex, Row } from "antd";
import React from "react";
import ProductImageCarousel from "./ProductImageCarousel";
import { DownloadOutlined } from "@ant-design/icons";

const SingleProductMainContent = ({ product }) => {
  return (
    <Row gutter={[16, 16]} justify="start">
      <Col xs={24} sm={24} md={12} lg={12} xl={8}>
        <ProductImageCarousel images={product} />
      </Col>
    </Row>
  );
};

export default SingleProductMainContent;
