import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { Col, Pagination, Row, Typography } from "antd";
import React from "react";
import ProductCard from "./ProductCard";

const { Title } = Typography;

const SellerProductListContent = ({
  isLoading,
  products,
  error,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  selectedCategory,
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

  return (
    <Row gutter={[16, 16]} justify="start">
      <Col span={24}>
        <Typography>
          <Title level={5}>
            {selectedCategory
              ? `Showing products for "${selectedCategory.categoryName}"`
              : `Showing all products`}
          </Title>
        </Typography>
      </Col>
      {products.length === 0 ? (
        <Col span={24}>
          <EmptyScreen message="No Products" />
        </Col>
      ) : (
        <>
          {products?.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.productId}>
              <ProductCard product={product} />
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
              pageSizeOptions={["2", "5", "10", "20", "50"]}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default SellerProductListContent;
