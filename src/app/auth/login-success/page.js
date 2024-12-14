"use client";
import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Result, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Paragraph } = Typography;

const LoginSuccess = () => {
  const [counter, setCounter] = useState(3);
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
      <div className="login-success-result">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="login-success-result">
      <Result
        status="success"
        title="You're logged in!"
        subTitle={
          <>
            <Paragraph>{`Redirecting to your dashboard in few seconds...`}</Paragraph>
            <Spin />
          </>
        }
        extra={[
          <Button type="primary" key="home" onClick={() => router.push("/")}>
            Take me Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default LoginSuccess;
