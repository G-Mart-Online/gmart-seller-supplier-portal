"use client";

import PermissionGuard from "@/components/auth/PermissionGuard";
import RoleGuard from "@/components/auth/RoleGuard";
import AuthUserNav from "@/components/common/AuthUserNav";
import CustomSpin from "@/components/common/CustomSpin";
import { ROLES } from "@/constants/constants";
import useAuthGuard from "@/utils/useAuthGuard";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const { Header, Sider, Content } = Layout;

const SupplierLayout = ({ children }) => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/supplier",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/supplier/products",
      icon: <ProductOutlined />,
      label: "Products",
    },
    {
      key: "/supplier/orders",
      icon: <ShopOutlined />,
      label: "Orders",
    },
    {
      key: "/supplier/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  const activeMenuItem = menuItems.find(
    (item) =>
      pathname === item.key ||
      (item.key !== "/supplier" && pathname.startsWith(`${item.key}/`))
  )?.key;

  if (!user) return <CustomSpin />;

  return (
    <>
      <PermissionGuard allowedRoles={[ROLES.SUPPLIER]} link="/" />
      <RoleGuard allowedRoles={[ROLES.SUPPLIER]}>
        <Layout className="supplier-layout">
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical"></div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[activeMenuItem]}
              onClick={(menuInfo) => router.push(menuInfo.key)}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header
              className="supplier-header"
              style={{
                paddingLeft: 0,
                paddingRight: 16,
                background: colorBgContainer,
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <AuthUserNav />
            </Header>
            <Content
              className="supplier-content"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                padding: 24,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </RoleGuard>
    </>
  );
};

export default SupplierLayout;
