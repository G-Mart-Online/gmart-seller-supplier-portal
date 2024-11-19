"use client";

import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PermissionGuard from "@/components/auth/PermissionGuard";
import { ROLES } from "@/constants/constants";
import RoleGuard from "@/components/auth/RoleGuard";
import useAuthGuard from "@/utils/useAuthGuard";
import CustomSpin from "@/components/common/CustomSpin";
import AuthUserNav from "@/components/common/AuthUserNav";

const { Header, Sider, Content } = Layout;

const SellerLayout = ({ children }) => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/seller",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/seller/products",
      icon: <ProductOutlined />,
      label: "Products",
    },
    {
      key: "/seller/orders",
      icon: <ShopOutlined />,
      label: "Orders",
    },
    {
      key: "/seller/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  const activeMenuItem = menuItems.find(
    (item) =>
      pathname === item.key ||
      (item.key !== "/seller" && pathname.startsWith(`${item.key}/`))
  )?.key;

  if (!user) return <CustomSpin />;

  return (
    <>
      <PermissionGuard allowedRoles={[ROLES.SELLER]} link="/" />
      <RoleGuard allowedRoles={[ROLES.SELLER]}>
        <Layout className="seller-layout">
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
              className="seller-header"
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
              className="seller-content"
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

export default SellerLayout;
