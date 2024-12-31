import CustomSpin from "@/components/common/CustomSpin";
import ErrorAlert from "@/components/common/ErrorAlert";
import { Line } from "@ant-design/plots";
import { Col, Flex, Row, Segmented, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const SalesSummaryChart = ({
  salesSummary,
  isSalesSummaryLoading,
  salesSummaryError,
  salesSummaryTimeFrame,
  setSalesSummaryTimeFrame,
}) => {
  const timeFrameMapping = {
    Daily: "date",
    Weekly: "week",
    Monthly: "month",
    Yearly: "year",
  };

  const formattedData = salesSummary?.map((item) => {
    if (salesSummaryTimeFrame === "date") {
      return { time: item.date, products: item.products };
    } else if (salesSummaryTimeFrame === "week") {
      return {
        time: `Week ${item.week}, ${item.month}/${item.year}`,
        products: item.products,
      };
    } else if (salesSummaryTimeFrame === "month") {
      return { time: `${item.month}/${item.year}`, products: item.products };
    } else if (salesSummaryTimeFrame === "year") {
      return { time: item.year, products: item.products };
    }
    return null;
  });

  const config = {
    data: formattedData,
    xField: "time",
    yField: "products",
    height: 300,
  };

  if (salesSummaryError) {
    return <ErrorAlert message="Error" description={salesSummaryError} />;
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Title type="secondary" level={4}>
            Sales Summary
          </Title>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Flex justify="flex-end">
            <Segmented
              size="small"
              options={["Daily", "Weekly", "Monthly", "Yearly"]}
              onChange={(value) => {
                const timeFrame = timeFrameMapping[value];
                setSalesSummaryTimeFrame(timeFrame);
              }}
              defaultValue="Daily"
            />
          </Flex>
        </Col>
        <Col span={24}>
          {isSalesSummaryLoading ? <CustomSpin /> : <Line {...config} />}
        </Col>
      </Row>
    </>
  );
};

export default SalesSummaryChart;
