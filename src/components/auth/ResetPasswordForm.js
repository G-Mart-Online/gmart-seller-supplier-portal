"use client";
import { resetPassword } from "@/services/authService";
import useNotification from "@/utils/useNotification";
import { LockOutlined, SafetyCertificateTwoTone } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const { Paragraph } = Typography;

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const { openNotification, contextHolder } = useNotification();
  const token = useSearchParams().get("token");

  const onFinish = async (values) => {
    setError(null);
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await resetPassword(values);
      openNotification(
        "success",
        "Password Reset Successful",
        "Your password has been updated successfully. Please log in with your new password."
      );
      setSuccess(true);
    } catch (error) {
      console.error("Error occurred while resetting password: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("search params:", token);

  return (
    <Flex
      gap="middle"
      vertical
      align="center"
      justify="center"
      className="auth-content"
    >
      {contextHolder}
      <SafetyCertificateTwoTone className="auth-icon" />

      <Typography.Title level={3} style={{ margin: 0 }}>
        Password Reset
      </Typography.Title>
      <Paragraph type="secondary" style={{ textAlign: "center" }}>
        Please enter your new password below and confirm it to complete the
        reset process. Once submitted, you'll be able to log in with your new
        password.
      </Paragraph>
      <Form
        name="reset-password"
        initialValues={{
          remember: true,
          passwordResetToken: token,
        }}
        onFinish={onFinish}
        style={{ minWidth: "100%" }}
      >
        {success && (
          <Alert
            message="Password reset successfully. You can now log in with your new password."
            type="success"
            style={{ marginBottom: "5px" }}
          />
        )}
        {error && (
          <Alert
            message={
              error?.response?.data?.message
                ? error.response.data.message
                : "An error occurred during password reset. Please try again."
            }
            type="error"
            style={{ marginBottom: "5px" }}
          />
        )}
        <Form.Item
          name="passwordResetToken"
          rules={[
            {
              required: true,
              message: "Please input your OTP",
            },
          ]}
          label="Reset Token"
          hasFeedback
        >
          <Input.OTP length={6} disabled />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your new Password!",
            },
            {
              min: 8,
              max: 2147483647,
              message: "Password must be at least 8 characters.",
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one digit.",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Reset Password
          </Button>
          or <Link href="/">back to log in</Link> |{" "}
          <Link href="/auth/forgot-password">request a new token</Link>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ResetPasswordForm;
