"use client";

import SellerProductListContent from "@/components/seller/products/SellerProductListContent";
import SellerPageContainer from "@/components/seller/SellerPageContainer";
import SellerPageTitle from "@/components/seller/SellerPageTitle";
import { fetchProducts } from "@/services/productService";
import { ProductFilled } from "@ant-design/icons";
import { Col, Divider, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const fetchProductsList = async (page = currentPage, size = pageSize) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProducts(true, true, page, size);
      setProducts(data?.content || data);
      setTotalItems(data.totalElements);
      setCurrentPage(page);
      setPageSize(size);
    } catch (error) {
      console.error("Error while fetching products:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page, size) => {
    fetchProductsList(page, size);
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <SellerPageTitle icon={<ProductFilled />} pageTitle="Products" />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <Select
            onChange={(value) => console.log("category selected::", value)}
            style={{ width: "100%" }}
            options={[
              { value: "category1", label: "Category 1" },
              { value: "category2", label: "Category 2" },
              { value: "category3", label: "Category 3" },
              { value: "category4", label: "Category 4", disabled: true },
            ]}
            placeholder="Select a Category"
            allowClear
            size="large"
            loading={isLoading}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <Search
            placeholder="Search Products"
            allowClear
            enterButton
            onSearch={onSearch}
            size="large"
            loading={isLoading}
          />
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer
        childern={
          <SellerProductListContent
            isLoading={isLoading}
            products={products}
            error={error}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        }
      />
    </>
  );
};

export default ProductPage;
