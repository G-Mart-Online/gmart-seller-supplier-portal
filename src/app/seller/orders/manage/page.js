"use client";
import ManageOrdersContainer from "@/components/seller/order/manage-orders/ManageOrdersContainer";
import SellerPageContainer from "@/components/seller/SellerPageContainer";
import SellerPageTitle from "@/components/seller/SellerPageTitle";
import {
  fetchOrdersBySeller,
  fetchOrdersBySupplier,
} from "@/services/orderService";
import useAuthGuard from "@/utils/useAuthGuard";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";

const ManageOrderPage = () => {
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
      const data = await fetchOrdersBySeller(user.id, page - 1, size);
      setOrders(data?.content || data);
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
          <SellerPageTitle icon={<AppstoreAddOutlined />} pageTitle="Orders" />
        </Col>

        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer
        childern={
          <ManageOrdersContainer
            orders={orders}
            isLoading={isLoading}
            totalItems={totalItems}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        }
      />
    </>
  );
};

export default ManageOrderPage;
