import { Col, Row } from "antd";
import React from "react";

const SellerPageContainer = ({ childern }) => {
  return (
    <Row className="seller-container">
      <Col span={24}>{childern}</Col>
    </Row>
  );
};

export default SellerPageContainer;
