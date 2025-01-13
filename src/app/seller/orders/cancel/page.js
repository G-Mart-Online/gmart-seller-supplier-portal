"use client";
import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Result, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Paragraph } = Typography;

const OrderCancel = () => {
  const [counter, setCounter] = useState(5);
  const router = useRouter();
  const { user, logout } = useAuthGuard({ middleware: "auth" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      if (user?.role === "USER" || user?.status !== "ACTIVE") {
        router.push("/auth/account-setup");
      } else if (user?.role === "SELLER" && user?.status === "ACTIVE") {
        router.push("/seller");
      } else if (user?.role === "SUPPLIER" && user?.status === "ACTIVE") {
        router.push("/supplier");
      } else {
        logout();
      }
    }
  }, [counter, user, router, logout]);

  if (!user) {
    return (
      <div className="cancel-page-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="cancel-page-result">
      <Result
        status="warning"
        title="You Have Canceled Your Order"
        subTitle={
          <Paragraph>
            {`Redirecting to the homepage in ${counter} seconds...`}
          </Paragraph>
        }
        extra={[
          <Button
            type="primary"
            key="retry"
            onClick={() => router.push("seller/orders/add")}
          >
            Retry Order
          </Button>,
          <Button key="home" onClick={() => router.push("/")}>
            Go to Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default OrderCancel;
