"use client";
import { Flex, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const SellerPageTitle = ({ icon, pageTitle }) => {
  return (
    <Flex
      gap="middle"
      align="center"
      className="seller-page-title-flex"
      style={{ height: "100%" }}
    >
      {icon}
      <Title level={4} style={{ margin: 0 }}>
        {pageTitle}
      </Title>
    </Flex>
  );
};

export default SellerPageTitle;
