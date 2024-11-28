"use client";
import PendingResult from "@/components/auth/account-setup/PendingResult";
import RoleSection from "@/components/auth/account-setup/RoleSection";
import SellerForm from "@/components/auth/account-setup/SellerForm";
import SuccessResult from "@/components/auth/account-setup/SuccessResult";
import SupplierForm from "@/components/auth/account-setup/SupplierForm";
import CustomSpin from "@/components/common/CustomSpin";
import { ROLES } from "@/constants/constants";
import useAuthGuard from "@/utils/useAuthGuard";
import { Col, Row, Steps, theme, Typography } from "antd";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

const AccountSetup = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Account Type",
      content: (
        <RoleSection
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          next={next}
        />
      ),
    },
    {
      title: "Onboarding",
      content:
        selectedRole === ROLES.SELLER ? (
          <SellerForm next={next} prev={prev} userId={user?.id} />
        ) : (
          <SupplierForm next={next} prev={prev} userId={user?.id} />
        ),
    },
    {
      title: "Approval",
      content:
        user?.status === "ACTIVE" ? (
          <SuccessResult />
        ) : user?.status === "PENDING" ? (
          <PendingResult />
        ) : null,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: 24,
    overflow: "auto",
    maxHeight: "65vh",
  };

  useEffect(() => {
    if (user?.status) {
      if (user?.status === "ACTIVE" || user?.status === "PENDING") {
        setCurrent(2);
      }
    }
  }, [user]);

  if (!user) return <CustomSpin />;

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={4}>Welcome to GMart!</Title>
      </Col>
      <Col span={24}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
      </Col>
    </Row>
  );
};

export default AccountSetup;
