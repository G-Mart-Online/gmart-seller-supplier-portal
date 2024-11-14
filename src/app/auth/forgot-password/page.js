import { Col, Row } from "antd";
import React from "react";
import AuthSideImage from "@/components/auth/AuthSideImage";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Row gutter={[30, 30]} justify="start" style={{ height: "100%" }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <ForgotPasswordForm />
      </Col>
      <Col xs={0} sm={0} md={12} lg={16} xl={16}>
        <AuthSideImage />
      </Col>
    </Row>
  );
};

export default ForgotPassword;
