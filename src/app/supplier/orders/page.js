"use client";

import ManageSupplierOrderContainer from "@/components/supplier/orders/ManageSupplierOrderContainer";
import SupplierPageContainer from "@/components/supplier/SupplierPageContainer";
import SupplierPageTitle from "@/components/supplier/SupplierPageTitle";
import { fetchOrdersBySupplier } from "@/services/orderService";
import useAuthGuard from "@/utils/useAuthGuard";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchOrderList = async (page = currentPage, size = pageSize) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchOrdersBySupplier(user.id, page - 1, size);
      setOrders(data?.content || data);
      setTotalItems(data.totalElements);
      setCurrentPage(page);
      setPageSize(size);
    } catch (error) {
      console.error("Error while fetching orders:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrderList();
    }
  }, [user]);

  const handlePageChange = (page, size) => {
    fetchOrderList(page, size);
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <SupplierPageTitle
            icon={<AppstoreAddOutlined />}
            pageTitle="Orders"
          />
        </Col>

        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SupplierPageContainer
        childern={
          <ManageSupplierOrderContainer
            orders={orders}
            isLoading={isLoading}
            totalItems={totalItems}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            error={error}
          />
        }
      />
    </>
  );
};

export default OrderPage;
