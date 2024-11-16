import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { Col, Pagination, Row } from "antd";
import React from "react";
import ProductCard from "./ProductCard";

const SellerProductContent = ({ isLoading, products, error }) => {
  if (isLoading) {
    return <CustomSpin />;
  }

  if (error) {
    return (
      <ErrorAlert
        message="error"
        description={
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "An unexpected error occurred. Please try again later."
        }
      />
    );
  }

  if (products.length === 0) {
    return <EmptyScreen message="No Products" />;
  }

  return (
    <Row gutter={[16, 16]} justify="start">
      {products?.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.productId}>
          <ProductCard product={product} />
        </Col>
      ))}
      <Col span={24}>
        <Pagination align="end" defaultCurrent={1} total={50} />
      </Col>
    </Row>
  );
};

export default SellerProductContent;
