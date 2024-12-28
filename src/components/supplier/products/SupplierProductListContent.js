import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { Col, Pagination, Row } from "antd";
import React from "react";
import SupplierProductCard from "./SupplierProductCard";

const SupplierProductListContent = ({
  isLoading,
  products,
  error,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  if (isLoading) {
    return <CustomSpin />;
  }

  if (error) {
    return (
      <ErrorAlert
        message="Error"
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
          <SupplierProductCard product={product} />
        </Col>
      ))}
      <Col span={24}>
        <Pagination
          align="end"
          current={currentPage + 1}
          pageSize={pageSize}
          total={totalItems}
          showSizeChanger
          onChange={(page, size) => onPageChange(page - 1, size)}
          pageSizeOptions={["5", "10", "20", "50"]}
        />
      </Col>
    </Row>
  );
};

export default SupplierProductListContent;
