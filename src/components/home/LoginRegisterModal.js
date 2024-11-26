import React from "react";
import { Modal, Tabs } from "antd";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginRegisterModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const items = [
    {
      key: "1",
      label: "Login",
      children: <LoginForm handleClose={handleCancel} />,
    },
    {
      key: "2",
      label: "Register",
      children: <RegisterForm handleClose={handleCancel} />,
    },
  ];

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  );
};

export default LoginRegisterModal;
