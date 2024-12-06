import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const PendingResult = () => {
  const router = useRouter();
  return (
    <Result
      status="info"
      title="Your account is pending approval."
      subTitle="Our team is reviewing your account. You will receive a notification once your account is approved. Thank you for your patience!"
      extra={[
        <Button type="primary" key="home" onClick={() => router.push("/")}>
          Go to Home
        </Button>,
        <Button key="contact" onClick={() => router.push("/contact")}>
          Contact Support
        </Button>,
      ]}
    />
  );
};

export default PendingResult;
