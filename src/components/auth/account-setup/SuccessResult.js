import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Result } from "antd";
import React from "react";

const SuccessResult = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  return (
    <Result
      status="success"
      title="Congratulations, your account is approved! Let’s get started."
      extra={[
        <Button type="primary" key="console">
          {user?.role === "SELLER"
            ? "Seller Dashboard"
            : user?.role === "SUPPLIER"
            ? "Supplier Dashboard"
            : "Home"}
        </Button>,
      ]}
    />
  );
};

export default SuccessResult;
