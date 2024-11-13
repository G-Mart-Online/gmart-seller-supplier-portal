"use client";
import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
      if (user?.role === "USER") {
        router.push("/auth/account-setup");
      } else if (user?.role === "SELLER") {
        router.push("/seller");
      } else if (user?.role === "SUPPLIER") {
        router.push("/supplier");
      } else {
        logout();
      }
    }
  }, [counter, user, router, logout]);

  return (
    <div className="login-success-result">
      <Result
        status="success"
        title="You're logged in!"
        subTitle={`Redirecting to your dashboard in ${counter} seconds...`}
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
