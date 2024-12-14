import { Col, Row } from "antd";
import React from "react";

const SupplierPageContainer = ({ childern }) => {
  return (
    <Row className="supplier-container">
      <Col span={24}>{childern}</Col>
    </Row>
  );
};

export default SupplierPageContainer;
