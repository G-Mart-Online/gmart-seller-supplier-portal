"use client";
import React, { useState } from "react";
import { Typography, Form, Input, Row, Col, Button, Divider } from "antd";
import Link from "next/link";
import profileImg from "../../../assets/images/profile.png";
const { Text } = Typography;
import Image from "next/image";
import { ProductFilled } from "@ant-design/icons";
import SellerPageTitle from "@/components/seller/SellerPageTitle";

const ProfilePage = () => {
  const textwidth = "40%";

  const [user] = useState({
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    role: "Admin",
    contactNo: "011 2729729",
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <SellerPageTitle
            icon={<ProductFilled />}
            pageTitle="Seller Profile"
          />
        </Col>

        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <Row gutter={[30, 30]} style={{ padding: "1%" }}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Image
            src={profileImg}
            alt="gmart-logo"
            layout="responsive"
            width={100}
            height={30}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={16}>
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item name="firstName">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ width: textwidth }}>First Name</Text>
                <Input placeholder="Seller Code" value="John" />
              </div>
            </Form.Item>
            <Form.Item name="lastName">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ width: textwidth }}>Last Name</Text>
                <Input placeholder="SellerName" value="Doe" />
              </div>
            </Form.Item>
            <Form.Item name="ContactNo">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ width: textwidth }}>Mobile No.</Text>
                <Input placeholder="MobileNo" value="077-567567567" />
              </div>
            </Form.Item>
            <Form.Item name="Email">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ width: textwidth }}>Email</Text>
                <Input placeholder="MobileNo" value="johndoe@example.com" />
              </div>
            </Form.Item>
            <Form.Item name="Role">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ width: textwidth }}>Role</Text>
                <Input placeholder="SellerStatus" value="Admin" />
              </div>
            </Form.Item>
          </Form>
          <div
            style={{
              width: "100%",
              height: "5%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1%",
            }}
          >
            <Button style={{ backgroundColor: "#8ca5bd" }}>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button type="primary">Save Changes</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
