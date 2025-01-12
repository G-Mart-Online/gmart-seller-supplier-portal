import { ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";
import React from "react";
import LowStockProductList from "./LowStockProductList";
import TopSellingProductList from "./TopSellingProductList";
import TopSellerList from "./TopSellerList";
import SupplierSalesSummaryChart from "./SupplierSalesSummaryChart";

const { Title } = Typography;

const SupplierDashboardMainContent = ({
  supplierStats,
  isLoading,
  salesSummary,
  isSalesSummaryLoading,
  salesSummaryError,
  salesSummaryTimeFrame,
  setSalesSummaryTimeFrame,
}) => {
  return (
    <Row gutter={[16, 16]} justify={"start"}>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Supplier Level"
            value={supplierStats?.supplierLevel || "N/A"}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: supplierStats?.supplierLevel ? "#3f8600" : "#cf1322",
            }}
            loading={isLoading}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Total Products"
            value={supplierStats?.totalProducts}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#3f8600",
            }}
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Total Orders"
            value={supplierStats?.totalOrders}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#3f8600",
            }}
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Pending Orders"
            value={supplierStats?.pendingOrders}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: supplierStats?.pendingOrders ? "#cf1322" : "#3f8600",
            }}
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Shipped Orders"
            value={supplierStats?.shippedOrders}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#3f8600",
            }}
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Return Orders"
            value={supplierStats?.returnOrders}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: supplierStats?.returnOrders ? "#cf1322" : "#3f8600",
            }}
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Total Sales (Products)"
            value={supplierStats?.totalSales}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#3f8600",
            }}
            loading={isLoading}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Total Income"
            value={supplierStats?.totalEarnings?.toFixed(2)}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#3f8600",
            }}
            loading={isLoading}
            prefix="Rs."
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={16} xl={16}>
        <SupplierSalesSummaryChart
          salesSummary={salesSummary}
          isSalesSummaryLoading={isSalesSummaryLoading}
          salesSummaryError={salesSummaryError}
          salesSummaryTimeFrame={salesSummaryTimeFrame}
          setSalesSummaryTimeFrame={setSalesSummaryTimeFrame}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <TopSellerList
          header={
            <Title level={5} type="secondary" style={{ margin: 0 }}>
              Your Best Sellers
            </Title>
          }
          sellers={supplierStats?.topSellers}
          isLoading={isLoading}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <LowStockProductList
          header={
            <Title level={5} type="secondary" style={{ margin: 0 }}>
              Low Stock Products
            </Title>
          }
          products={supplierStats?.lowStockProducts}
          isLoading={isLoading}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <TopSellingProductList
          header={
            <Title level={5} type="secondary" style={{ margin: 0 }}>
              Best Selling Products
            </Title>
          }
          products={supplierStats?.topSellingProducts}
          isLoading={isLoading}
        />
      </Col>
    </Row>
  );
};

export default SupplierDashboardMainContent;
