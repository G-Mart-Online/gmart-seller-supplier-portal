import { Button, Result } from "antd";
import React from "react";

const SuccessResult = () => {
  return (
    <Result
      status="success"
      title="Congratulations, your account is approved! Let’s get started."
      extra={[
        <Button type="primary" key="console">
          Go Dashboard
        </Button>,
      ]}
    />
  );
};

export default SuccessResult;
