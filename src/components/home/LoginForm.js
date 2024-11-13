import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import SocialLogin from "./SocialLogin";
import useAuthGuard from "@/utils/useAuthGuard";
import useNotification from "@/utils/useNotification";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthGuard({
    middleware: "guest",
    redirectIfAuthenticated: "/auth/login-success",
  });
  const [error, setError] = useState();
  const { openNotification, contextHolder } = useNotification();

  const onFinish = async (values) => {
    setError(null);
    setIsLoading(true);
    try {
      await login({
        onError: (errors) => {
          setError(errors);
          if (errors) {
            openNotification("error", "Error Title", error.message);
            console.error("Error occurred while logging in:", errors);
          }
        },
        props: values,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>

        <SocialLogin />
      </Form>
      {contextHolder}
    </>
  );
};

export default LoginForm;
