"use client";

import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ProductOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PermissionGuard from "@/components/auth/PermissionGuard";
import { ROLES } from "@/constants/constants";
import RoleGuard from "@/components/auth/RoleGuard";
import useAuthGuard from "@/utils/useAuthGuard";
import CustomSpin from "@/components/common/CustomSpin";
import AuthUserNav from "@/components/common/AuthUserNav";
import LogoImg from "../../assets/images/logo.png";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

const SellerLayout = ({ children }) => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
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
      children: [
        {
          key: "/seller/orders/add",
          icon: <PlusOutlined />,
          label: "Add Order",
        },
        {
          key: "/seller/orders/manage",
          icon: <UnorderedListOutlined />,
          label: "Manage Orders",
        },
      ],
    },
    {
      key: "/seller/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  const findActiveKeys = (items, path) => {
    for (const item of items) {
      if (item.key === path) return { selectedKey: item.key, parentKey: null };
      if (item.children) {
        const childResult = findActiveKeys(item.children, path);
        if (childResult.selectedKey) {
          return {
            selectedKey: childResult.selectedKey,
            parentKey: item.key,
          };
        }
      }
    }
    return { selectedKey: null, parentKey: null };
  };

  const { selectedKey, parentKey } = findActiveKeys(menuItems, pathname);

  useEffect(() => {
    if (parentKey) setOpenKeys([parentKey]);
  }, [parentKey]);

  if (!user) return <CustomSpin />;

  return (
    <>
      <PermissionGuard allowedRoles={[ROLES.SELLER]} link="/" />
      <RoleGuard allowedRoles={[ROLES.SELLER]}>
        <Layout className="seller-layout">
          <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
            <div className="demo-logo-vertical">
              <Flex
                justify="center"
                align="center"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  borderRadius: "9px",
                }}
              >
                <Image src={LogoImg} alt="gmart-logo" width={40} height={40} />
              </Flex>
            </div>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys)}
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
