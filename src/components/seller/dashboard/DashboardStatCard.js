import { Card, Statistic } from "antd";
import React from "react";

const DashboardStatCard = ({ title, value, isLoading, suffix = null }) => {
  return (
    <Card>
      <Statistic
        title={title}
        value={value !== null ? value : "N/A"}
        valueStyle={{
          fontWeight: "bold",
          fontSize: "24px",
          color: value ? "#3f8600" : "#cf1322",
        }}
        loading={isLoading}
        suffix={suffix}
      />
    </Card>
  );
};

export default DashboardStatCard;
