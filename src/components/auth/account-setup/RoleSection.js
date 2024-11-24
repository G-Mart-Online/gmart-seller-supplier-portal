import { ROLES } from "@/constants/constants";
import { RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const RoleSection = ({ selectedRole, setSelectedRole, next }) => {
  const roles = [
    {
      title: "I am a Seller",
      description:
        "Sell your products to a wide range of customers and grow your business.",
      buttonText: "Continue as Seller",
      role: ROLES.SELLER,
    },
    {
      title: "I am a Supplier",
      description:
        "Supply your products to sellers and expand your market reach.",
      buttonText: "Continue as Supplier",
      role: ROLES.SUPPLIER,
    },
  ];

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    console.log("role::", role);
  };

  return (
    <Row className="account-setup-main-row" gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Title level={5}>Choose your account type to get started</Title>
      </Col>

      {roles.map(({ title, description, role }) => (
        <Col key={role} xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card
            className="role-selection-card"
            title={title}
            bordered={true}
            hoverable
            style={{
              boxShadow:
                selectedRole === role
                  ? "0 4px 10px rgba(0, 123, 255, 0.4)"
                  : "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderColor: selectedRole === role ? "#007bff" : "#f0f0f0",
            }}
            onClick={() => handleRoleSelection(role)}
          >
            <Paragraph className="role-selection-card-para" type="secondary">
              {description}
            </Paragraph>
          </Card>
        </Col>
      ))}
      <Col span={24}>
        <Button
          type="primary"
          icon={<RightOutlined />}
          iconPosition="end"
          onClick={next}
          disabled={!selectedRole}
        >
          Continue
        </Button>
      </Col>
    </Row>
  );
};

export default RoleSection;
