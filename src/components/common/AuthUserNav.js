import useAuthGuard from "@/utils/useAuthGuard";
import { ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Modal, Space } from "antd";
import React, { useState } from "react";

const AuthUserNav = () => {
  const { user, logout } = useAuthGuard({ middleware: "auth" });
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to log out?",
      okText: "Logout",
      cancelText: "Cancel",
      onOk: () => logout(),
    });
  };

  const userInitials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "";

  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: confirm,
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
            >
              {userInitials}
            </Avatar>
            {/* <DownOutlined /> */}
          </Space>
        </a>
      </Dropdown>
      {contextHolder}
    </>
  );
};

export default AuthUserNav;
