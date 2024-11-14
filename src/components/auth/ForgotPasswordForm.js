"use client";
import { sendResetEmail } from "@/services/authService";
import useNotification from "@/utils/useNotification";
import { LockTwoTone, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const { Paragraph } = Typography;

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const { openNotification, contextHolder } = useNotification();

  const onFinish = async (values) => {
    setError(null);
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await sendResetEmail(values);
      openNotification(
        "success",
        "Email Sent",
        "Password reset email sent successfully. Instructions to reset your password have been sent to your email. Please check your inbox."
      );
      setSuccess(true);
    } catch (error) {
      console.error("Error occurred while requesting password reset: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Flex
      gap="middle"
      vertical
      align="center"
      justify="center"
      className="auth-content"
    >
      {contextHolder}
      <LockTwoTone className="auth-icon" />
      <Typography.Title level={3} style={{ margin: 0 }}>
        Forgot Password?
      </Typography.Title>
      <Paragraph type="secondary" style={{ textAlign: "center" }}>
        No worrries, we'll send you reset instructions.
      </Paragraph>
      <Form
        name="forgot-password"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ minWidth: "100%" }}
      >
        {success && (
          <Alert
            message="Please check your email for further instructions."
            type="success"
            style={{ marginBottom: "5px" }}
          />
        )}
        {error && (
          <Alert
            message={
              error?.response?.data?.message
                ? error.response.data.message
                : "Something went wrong. Please try again."
            }
            type="error"
            style={{ marginBottom: "5px" }}
          />
        )}
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Send reset email
          </Button>
          or <Link href="/">back to Home</Link>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ForgotPasswordForm;
