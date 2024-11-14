import React, { useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import SocialLogin from "./SocialLogin";
import { getUserRegistered } from "@/services/authService";
import useNotification from "@/utils/useNotification";

const RegisterForm = ({ handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const { openNotification, contextHolder } = useNotification();

  const onFinish = async (values) => {
    setError(null);
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await getUserRegistered(values);
      openNotification(
        "success",
        "Account created successfully",
        "A verification email has been sent. Please check your inbox to verify your account."
      );
      setSuccess(true);
      handleClose();
    } catch (error) {
      console.error("Error occurred while registering: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <Form
        name="register"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {success && (
          <Alert
            message="A verification email has been sent. Please check your inbox to verify your account."
            type="success"
            style={{ marginBottom: "5px" }}
          />
        )}
        {error && (
          <Alert
            message={
              error?.response?.data?.errors
                ? Object.values(error.response.data.errors).join(", ")
                : "An unexpected error occurred. Please try again."
            }
            type="error"
            style={{ marginBottom: "5px" }}
          />
        )}
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
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
          name="passwordConfirmation"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
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
            Register
          </Button>
          or <a href="">Already have an account?</a>
        </Form.Item>

        <SocialLogin />
      </Form>
      {contextHolder}
    </>
  );
};

export default RegisterForm;
