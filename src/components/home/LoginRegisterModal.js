import React from "react";
import { Modal, Tabs } from "antd";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginRegisterModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const items = [
    {
      key: "1",
      label: "Login",
      children: <LoginForm />,
    },
    {
      key: "2",
      label: "Register",
      children: <RegisterForm />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Modal>
  );
};

export default LoginRegisterModal;
