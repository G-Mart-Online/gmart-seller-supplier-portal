import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessResult = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const router = useRouter();

  const handleRedirect = () => {
    switch (user?.role) {
      case "SELLER":
        router.push("/seller");
        break;
      case "SUPPLIER":
        router.push("/supplier");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <Result
      status="success"
      title="Congratulations, your account is approved! Let’s get started."
      extra={[
        <Button type="primary" key="direction" onClick={handleRedirect}>
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
