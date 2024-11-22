import { Col, Row, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const SupplierForm = () => {
  return (
    <Row className="account-setup-main-row" gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Title className="account-setup-title" level={5}>
          Tell us more about your supply business!
        </Title>
      </Col>
      
    </Row>
  );
};

export default SupplierForm;
