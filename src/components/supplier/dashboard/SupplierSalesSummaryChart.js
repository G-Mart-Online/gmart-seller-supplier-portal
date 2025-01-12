import ErrorAlert from "@/components/common/ErrorAlert";
import { Line } from "@ant-design/plots";
import { Card, Col, Flex, Row, Segmented, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const SupplierSalesSummaryChart = ({
  salesSummary,
  isSalesSummaryLoading,
  salesSummaryError,
  salesSummaryTimeFrame,
  setSalesSummaryTimeFrame,
}) => {
  const timeFrameOptions = [
    {
      label: "Daily",
      value: "date",
    },
    {
      label: "Weekly",
      value: "week",
    },
    {
      label: "Monthly",
      value: "month",
    },
    {
      label: "Yearly",
      value: "year",
    },
  ];

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
    <Card
      title={
        <Title level={5} type="secondary" style={{ margin: 0 }}>
          Sales Summary
        </Title>
      }
      loading={isSalesSummaryLoading}
    >
      <Row>
        <Col span={24}>
          <Flex justify="flex-end">
            <Segmented
              size="small"
              options={timeFrameOptions}
              onChange={(value) => {
                setSalesSummaryTimeFrame(value);
              }}
              defaultValue={salesSummaryTimeFrame}
            />
          </Flex>
        </Col>
        <Col span={24}>
          <Line {...config} />
        </Col>
      </Row>
    </Card>
  );
};

export default SupplierSalesSummaryChart;
