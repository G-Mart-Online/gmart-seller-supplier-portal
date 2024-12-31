import { Card, Col, Row, Statistic, Typography } from "antd";
import React from "react";
import DashboardStatCard from "./DashboardStatCard";
import { ArrowUpOutlined } from "@ant-design/icons";
import SupplierList from "./SupplierList";
import SalesSummaryChart from "./SalesSummaryChart";

const { Title } = Typography;

const DashboardMainContent = ({
  sellerStats,
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
            title="Seller Level"
            value={sellerStats.sellerLevel || "N/A"}
            valueStyle={{
              fontWeight: "bold",
              fontSize: "24px",
              color: sellerStats.sellerLevel ? "#3f8600" : "#cf1322",
            }}
            loading={isLoading}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <DashboardStatCard
          title="Total Products Sold"
          value={sellerStats.totalSales}
          isLoading={isLoading}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <DashboardStatCard
          title="Total Orders"
          value={sellerStats.totalOrders}
          isLoading={isLoading}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <DashboardStatCard
          title="Pending Orders"
          value={sellerStats.pendingOrders}
          isLoading={isLoading}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <DashboardStatCard
          title="Shipped Orders"
          value={sellerStats.shippedOrders}
          isLoading={isLoading}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <DashboardStatCard
          title="Delivered Orders"
          value={sellerStats.deliveredOrders}
          isLoading={isLoading}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <DashboardStatCard
          title="Return Orders"
          value={sellerStats.returnOrders}
          isLoading={isLoading}
        />
      </Col>
      <Col span={24}>
        <SupplierList
          header={
            <Title level={5} type="secondary">
              Your Top Suppliers
            </Title>
          }
          suppliers={sellerStats.topSuppliers}
          isLoading={isLoading}
        />
      </Col>
      <Col span={24}>
        <SalesSummaryChart
          salesSummary={salesSummary}
          isSalesSummaryLoading={isSalesSummaryLoading}
          salesSummaryError={salesSummaryError}
          salesSummaryTimeFrame={salesSummaryTimeFrame}
          setSalesSummaryTimeFrame={setSalesSummaryTimeFrame}
        />
      </Col>
    </Row>
  );
};

export default DashboardMainContent;
