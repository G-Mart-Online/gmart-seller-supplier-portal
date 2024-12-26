import { Col, Row, Typography } from "antd";
import React from "react";
import DashboardStatCard from "./DashboardStatCard";

const { Title } = Typography;

const DashboardMainContent = ({ sellerStats, isLoading }) => {
  return (
    <Row gutter={[16, 16]} justify={"start"}>
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
        <Title level={5}>Charts</Title>
      </Col>
    </Row>
  );
};

export default DashboardMainContent;
