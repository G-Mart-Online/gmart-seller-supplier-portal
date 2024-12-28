"use client";

import SupplierProductListContent from "@/components/supplier/products/SupplierProductListContent";
import SupplierPageContainer from "@/components/supplier/SupplierPageContainer";
import SupplierPageTitle from "@/components/supplier/SupplierPageTitle";
import { fetchProductsBySupplier } from "@/services/productService";
import useAuthGuard from "@/utils/useAuthGuard";
import { PlusOutlined, ProductFilled } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Row, Tooltip } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
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
      const data = await fetchProductsBySupplier(
        "ACTIVE",
        page,
        size,
        user?.id
      );
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
          <SupplierPageTitle
            icon={<ProductFilled />}
            pageTitle="All Your Products"
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Flex justify="flex-end">
            <Tooltip title="View product details">
              <Link href={`products/add`}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="seller-product-card-btn"
                >
                  Create Product
                </Button>
              </Link>
            </Tooltip>
          </Flex>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SupplierPageContainer
        childern={
          <SupplierProductListContent
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

export default ProductsList;
