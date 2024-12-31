"use client";
import ErrorAlert from "@/components/common/ErrorAlert";
import DashboardMainContent from "@/components/seller/dashboard/DashboardMainContent";
import SellerPageContainer from "@/components/seller/SellerPageContainer";
import {
  fetchSalesSummaryForSeller,
  fetchSellerDashboardDetails,
} from "@/services/sellerService";
import useAuthGuard from "@/utils/useAuthGuard";
import { DashboardOutlined } from "@ant-design/icons";
import { Col, Divider, Flex, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

const SellerDashboard = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [sellerStats, setSellerStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesSummary, setSalesSummary] = useState([]);
  const [isSalesSummaryLoading, setIsSalesSummaryLoading] = useState(true);
  const [salesSummaryError, setSalesSummaryError] = useState(null);
  const [salesSummaryTimeFrame, setSalesSummaryTimeFrame] = useState("date");

  const getSellerStatsForSeller = async (sellerId) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchSellerDashboardDetails(sellerId);
      setSellerStats(data);
    } catch (error) {
      console.error("Error while fetching seller details", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while fetching seller details.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getSalesSummaryForSeller = async (sellerId, timeFrame) => {
    try {
      setIsSalesSummaryLoading(true);
      setSalesSummaryError(null);
      const data = await fetchSalesSummaryForSeller(sellerId, timeFrame);
      setSalesSummary(data);
    } catch (error) {
      console.error("Error while fetching sales summary for seller", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while fetching sales summary.";
      setSalesSummaryError(errorMessage);
    } finally {
      setIsSalesSummaryLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getSellerStatsForSeller(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user && salesSummaryTimeFrame) {
      getSalesSummaryForSeller(user.id, salesSummaryTimeFrame);
    }
  }, [user, salesSummaryTimeFrame]);

  if (error) {
    return <ErrorAlert message="Error" description={error} />;
  }

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Flex
            gap="middle"
            align="center"
            className="seller-page-title-flex"
            style={{ height: "100%" }}
          >
            <DashboardOutlined />
            <Title level={4} style={{ margin: 0 }}>
              Dashboard
            </Title>
          </Flex>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer
        childern={
          <DashboardMainContent
            sellerStats={sellerStats}
            isLoading={isLoading}
            salesSummary={salesSummary}
            isSalesSummaryLoading={isSalesSummaryLoading}
            salesSummaryError={salesSummaryError}
            salesSummaryTimeFrame={salesSummaryTimeFrame}
            setSalesSummaryTimeFrame={setSalesSummaryTimeFrame}
          />
        }
      />
    </>
  );
};

export default SellerDashboard;
