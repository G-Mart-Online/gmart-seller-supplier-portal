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
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
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
      key: "/",
      label: "Home",
    },
    {
      key: "/about",
      label: "About",
    },
    {
      key: "/contact",
      label: "Contact",
    },
  ];

  return (
    <>
      <Image src={Logo} width={40} height={40} alt="GMart Logo" />
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={items}
        className="menu"
        onClick={(e) => router.push(e.key)} // Navigate to the clicked route
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
