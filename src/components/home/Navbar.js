"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import { UserOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import "../../assets/styles/home-styles.css";

const Navbar = () => {
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
      <Button type="primary" icon={<UserOutlined />} shape="round">
        Login/Register
      </Button>
    </>
  );
};

export default Navbar;
