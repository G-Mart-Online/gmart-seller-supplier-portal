import AuthSideImage from "@/components/auth/AuthSideImage";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Col, Row } from "antd";
import React from "react";

const ResetPassword = () => {
  return (
    <Row gutter={[30, 30]} justify="start" style={{ height: "100%" }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <ResetPasswordForm />
      </Col>
      <Col xs={0} sm={0} md={12} lg={16} xl={16}>
        <AuthSideImage />
      </Col>
    </Row>
  );
};

export default ResetPassword;
