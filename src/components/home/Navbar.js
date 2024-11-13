"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import { UserOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import "../../assets/styles/home-styles.css";
import LoginRegisterModal from "./LoginRegisterModal";
import useAuthGuard from "@/utils/useAuthGuard";
import AuthUserNav from "../common/AuthUserNav";

const Navbar = () => {
  const { user } = useAuthGuard({ middleware: "guest" });
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
      label: "About",
    },
    {
      key: "3",
      label: "Contact",
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

      {!user && (
        <Button
          type="primary"
          icon={<UserOutlined />}
          shape="round"
          onClick={showLoginModal}
        >
          Login/Register
        </Button>
      )}

      {user && <AuthUserNav />}

      <LoginRegisterModal
        isModalOpen={isLoginModalOpen}
        handleOk={loginModalHandleOk}
        handleCancel={loginModalHandleCancel}
      />
    </>
  );
};

export default Navbar;
