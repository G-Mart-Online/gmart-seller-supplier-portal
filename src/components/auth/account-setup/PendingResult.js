import { Button, Result } from "antd";
import React from "react";

const PendingResult = () => {
  return (
    <Result
      status="info"
      title="Your account is pending approval."
      subTitle="Our team is reviewing your account. You will receive a notification once your account is approved. Thank you for your patience!"
      extra={[
        <Button type="primary" key="dashboard">
          Go to Home
        </Button>,
        <Button key="contact" href="/contact">
          Contact Support
        </Button>,
      ]}
    />
  );
};

export default PendingResult;
