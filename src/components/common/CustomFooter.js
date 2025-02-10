import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Button,
  Input,
  Divider,
} from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const footerStyles = {
  wrapper: {
    background: "#001529",
    padding: "60px 24px 24px",
    color: "#fff",
    borderRadius: "12px 12px 0px 0px",
  },
  section: {
    marginBottom: "32px",
  },
  title: {
    color: "#fff",
    marginBottom: "24px",
  },
  link: {
    color: "#rgba(255, 255, 255, 0.8)",
    "&:hover": {
      color: "#1890ff",
    },
  },
  socialIcon: {
    fontSize: "24px",
    color: "#fff",
    marginRight: "16px",
    cursor: "pointer",
    transition: "color 0.3s",
    "&:hover": {
      color: "#1890ff",
    },
  },
  newsletterInput: {
    width: "100%",
    maxWidth: "400px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  contactIcon: {
    fontSize: "16px",
    marginRight: "12px",
    color: "#1890ff",
  },
  bottomBar: {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    marginTop: "48px",
    paddingTop: "24px",
    textAlign: "center",
  },
};

const CustomFooter = () => {
  return (
    <Footer style={footerStyles.wrapper}>
      <Row gutter={[48, 32]}>
        {/* Company Info */}
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={footerStyles.section}>
            <Title level={4} style={footerStyles.title}>
              GMart
            </Title>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                display: "block",
                marginBottom: "24px",
              }}
            >
              Connecting suppliers and sellers worldwide. Your trusted platform
              for e-commerce success.
            </Text>
            <Space>
              <FacebookOutlined style={footerStyles.socialIcon} />
              <TwitterOutlined style={footerStyles.socialIcon} />
              <InstagramOutlined style={footerStyles.socialIcon} />
              <LinkedinOutlined style={footerStyles.socialIcon} />
            </Space>
          </div>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={footerStyles.section}>
            <Title level={4} style={footerStyles.title}>
              Quick Links
            </Title>
            <Space direction="vertical">
              <Link style={footerStyles.link}>About Us</Link>
              <Link style={footerStyles.link}>Become a Seller</Link>
              <Link style={footerStyles.link}>Become a Supplier</Link>
              <Link style={footerStyles.link}>Pricing Plans</Link>
              <Link style={footerStyles.link}>Success Stories</Link>
            </Space>
          </div>
        </Col>

        {/* Contact Info */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={footerStyles.section}>
            <Title level={4} style={footerStyles.title}>
              Contact Us
            </Title>
            <div style={footerStyles.contactItem}>
              <PhoneOutlined style={footerStyles.contactIcon} />
              <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                +1 (555) 123-4567
              </Text>
            </div>
            <div style={footerStyles.contactItem}>
              <MailOutlined style={footerStyles.contactIcon} />
              <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                support@gmart.com
              </Text>
            </div>
            <div style={footerStyles.contactItem}>
              <EnvironmentOutlined style={footerStyles.contactIcon} />
              <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                123 Commerce Street, Business District, NY 10001
              </Text>
            </div>
          </div>
        </Col>

        {/* Newsletter */}
        <Col xs={24} sm={24} md={24} lg={6}>
          <div style={footerStyles.section}>
            <Title level={4} style={footerStyles.title}>
              Newsletter
            </Title>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Subscribe to our newsletter for updates and exclusive offers.
            </Text>
            <Space.Compact style={footerStyles.newsletterInput}>
              <Input placeholder="Your email address" />
              <Button type="primary" icon={<SendOutlined />}>
                Subscribe
              </Button>
            </Space.Compact>
          </div>
        </Col>
      </Row>

      {/* Bottom Bar */}
      <div style={footerStyles.bottomBar}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <Text style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              © 2024 GMart. All rights reserved.
            </Text>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <Space
              split={
                <Divider
                  type="vertical"
                  style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
                />
              }
            >
              <Link style={footerStyles.link}>Privacy Policy</Link>
              <Link style={footerStyles.link}>Terms of Service</Link>
              <Link style={footerStyles.link}>Cookie Policy</Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default CustomFooter;
