"use client";

import ManageSupplierOrderContainer from "@/components/supplier/orders/ManageSupplierOrderContainer";
import SupplierPageContainer from "@/components/supplier/SupplierPageContainer";
import SupplierPageTitle from "@/components/supplier/SupplierPageTitle";
import { fetchOrdersBySupplier } from "@/services/orderService";
import useAuthGuard from "@/utils/useAuthGuard";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Col, Divider, Flex, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);

  const orderStatusfilterOptions = [
    {
      value: "CREATED",
      label: "Created",
    },
    {
      value: "CONFIRMED",
      label: "Confirmed",
    },
    {
      value: "SHIPPED",
      label: "Shipped",
    },
    {
      value: "DELIVERED",
      label: "Delivered",
    },
    {
      value: "CANCELLED",
      label: "Cancelled",
    },
  ];

  const fetchOrderList = async (page = currentPage, size = pageSize) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchOrdersBySupplier(
        user.id,
        page - 1,
        size,
        orderStatus
      );
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
  }, [user, orderStatus]);

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
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Flex justify="flex-end">
            <Select
              style={{ width: 200 }}
              placeholder="Filter by Status"
              optionFilterProp="label"
              options={orderStatusfilterOptions}
              allowClear={true}
              onChange={(value) => setOrderStatus(value)}
            />
          </Flex>
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
