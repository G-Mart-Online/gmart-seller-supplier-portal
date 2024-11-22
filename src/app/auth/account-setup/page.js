"use client";
import PendingResult from "@/components/auth/account-setup/PendingResult";
import RoleSection from "@/components/auth/account-setup/RoleSection";
import SellerForm from "@/components/auth/account-setup/SellerForm";
import SuccessResult from "@/components/auth/account-setup/SuccessResult";
import SupplierForm from "@/components/auth/account-setup/SupplierForm";
import CustomSpin from "@/components/common/CustomSpin";
import { ROLES } from "@/constants/constants";
import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Col, Row, Steps, theme, Typography } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

const AccountSetup = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isApproved, setIsApproved] = useState(false);

  const steps = [
    {
      title: "Account Type",
      content: (
        <RoleSection
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      ),
    },
    {
      title: "Onboarding",
      content:
        selectedRole === ROLES.SELLER ? <SellerForm /> : <SupplierForm />,
    },
    {
      title: "Approval",
      content: isApproved ? <SuccessResult /> : <PendingResult />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
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
    maxHeight: "60vh",
  };

  if (!user) return <CustomSpin />;

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={4}>Welcome to GMart!</Title>
      </Col>
      <Col span={24}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => console.log("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AccountSetup;
