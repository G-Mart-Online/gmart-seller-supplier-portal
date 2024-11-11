"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import { UserOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import "../../assets/styles/home-styles.css";
import LoginRegisterModal from "./LoginRegisterModal";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const loginModalHandleOk = () => {
    setIsLoginModalOpen(false);
  };
  const loginModalHandleCancel = () => {
    setIsLoginModalOpen(false);
  };

  const items = [
    {
      key: "1",
      label: "Home",
    },
    {
      key: "2",
      label: "Categories",
    },
    {
      key: "3",
      label: "Deals",
    },
  ];

  return (
    <>
      <Image src={Logo} width={40} height={40} alt="GMart Logo" />
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        className="menu"
      />
      <Button
        type="primary"
        icon={<UserOutlined />}
        shape="round"
        onClick={showLoginModal}
      >
        Login/Register
      </Button>
      <LoginRegisterModal
        isModalOpen={isLoginModalOpen}
        handleOk={loginModalHandleOk}
        handleCancel={loginModalHandleCancel}
      />
    </>
  );
};

export default Navbar;
