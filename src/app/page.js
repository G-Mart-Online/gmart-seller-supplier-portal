"use client";
import { motion } from "framer-motion";
import CustomFooter from "@/components/common/CustomFooter";
import HomeLayout from "@/components/home/HomeLayout";
import { getCsrfToken } from "@/services/authService";
import {
  DollarOutlined,
  GlobalOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  ShopFilled,
  TeamOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { useEffect } from "react";

const { Paragraph, Title, Text } = Typography;

const styles = {
  heroSection: {
    minHeight: "500px",
    background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)",
    padding: "48px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "12px",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  section: {
    padding: "64px 24px",
  },
  centeredSection: {
    padding: "64px 24px",
    textAlign: "center",
  },
  featureCard: {
    textAlign: "center",
    height: "100%",
  },
  featureIcon: {
    fontSize: "36px",
    color: "#1890ff",
    marginBottom: "24px",
  },
  stepNumber: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#1890ff",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    flexShrink: 0,
  },
  stepNumberViolet: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#722ed1",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  ctaSection: {
    background:
      "linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    padding: "80px 24px",
    textAlign: "center",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%),
        radial-gradient(circle at 80% -50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 50%),
        linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.05) 50%, transparent 52%),
        linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.05) 50%, transparent 52%)
      `,
      backgroundSize: "100% 100%, 100% 100%, 30px 30px, 30px 30px",
    },
  },

  centeredSection: {
    padding: "64px 24px",
    textAlign: "center",
    background: "linear-gradient(135deg, #fafcff 0%, #f0f7ff 100%)",
    borderRadius: "12px",
  },
  section: {
    padding: "64px 24px",
    background: "linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%)",
    borderRadius: "12px",
  },
  featureCard: {
    textAlign: "center",
    height: "100%",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    padding: "32px 24px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(24, 144, 255, 0.1)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 24px rgba(24, 144, 255, 0.1)",
    },
  },
  stepContainer: {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "16px",
    border: "1px solid rgba(24, 144, 255, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 24px rgba(24, 144, 255, 0.1)",
    },
  },
  aboutSection: {
    padding: "64px 24px",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f0f7ff 50%, #e6f4ff 100%)",
    borderRadius: "12px",
  },
  aboutCard: {
    height: "100%",
    borderRadius: "8px",
    transition: "all 0.3s",
  },
  aboutImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  missionCard: {
    background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
    color: "#fff",
    padding: "24px",
    borderRadius: "8px",
    height: "100%",
  },
  statCard: {
    textAlign: "center",
    padding: "24px",
    background: "#fff",
    borderRadius: "8px",
    height: "100%",
  },
  statNumber: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#1890ff",
    marginBottom: "8px",
  },
};

const heroFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInUp = {
  offscreen: {
    y: 60,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

const staggerContainer = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariant = {
  offscreen: {
    y: 40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.2,
    },
  },
};

export default function Home() {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await getCsrfToken();
      } catch (error) {
        console.error("Error occurred while getting CSRF token", error);
      }
    };

    fetchCsrfToken();
  }, []);
  return (
    <HomeLayout>
      <Row gutter={[30, 30]} justify="start">
        <Col span={24}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroFadeInUp}
            style={styles.heroSection}
          >
            <div style={styles.heroContent}>
              <motion.div variants={heroFadeInUp}>
                <Title style={{ color: "#fff", marginBottom: "24px" }}>
                  Welcome to GMart
                </Title>
              </motion.div>
              <motion.div variants={heroFadeInUp} transition={{ delay: 0.2 }}>
                <Paragraph
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    marginBottom: "32px",
                  }}
                >
                  Your one-stop marketplace connecting suppliers and sellers.
                  Start your e-commerce journey today!
                </Paragraph>
              </motion.div>
              <motion.div variants={heroFadeInUp} transition={{ delay: 0.4 }}>
                <Space size="large">
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      background: "#fff",
                      borderColor: "#fff",
                      color: "#4158D0",
                      fontWeight: "500",
                      padding: "0 32px",
                      height: "48px",
                      fontSize: "16px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.1)";
                    }}
                    icon={<ShopFilled />}
                  >
                    Become a Seller
                  </Button>
                  <Button
                    ghost
                    size="large"
                    style={{
                      color: "#fff",
                      borderColor: "#fff",
                      padding: "0 32px",
                      height: "48px",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.background = "transparent";
                    }}
                    icon={<TruckOutlined />}
                  >
                    Register as Supplier
                  </Button>
                </Space>
              </motion.div>
            </div>
          </motion.div>
        </Col>

        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.centeredSection}
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} style={{ marginBottom: "48px" }}>
                Why Choose GMart?
              </Title>
            </motion.div>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <motion.div variants={cardVariant}>
                  <Card style={styles.featureCard}>
                    <DollarOutlined style={styles.featureIcon} />
                    <Title level={4}>Maximize Profits</Title>
                    <Text type="secondary">
                      Connect directly with suppliers and optimize your margins
                    </Text>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8}>
                <motion.div variants={cardVariant}>
                  <Card style={styles.featureCard}>
                    <TruckOutlined style={styles.featureIcon} />
                    <Title level={4}>Hassle-free Delivery</Title>
                    <Text type="secondary">
                      We handle all logistics, you focus on growing your
                      business
                    </Text>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8}>
                <motion.div variants={cardVariant}>
                  <Card style={styles.featureCard}>
                    <SafetyCertificateOutlined style={styles.featureIcon} />
                    <Title level={4}>Secure Platform</Title>
                    <Text type="secondary">
                      Verified suppliers and secure transactions guaranteed
                    </Text>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Col>

        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.section}
          >
            <motion.div variants={fadeInUp}>
              <Title
                level={2}
                style={{ textAlign: "center", marginBottom: "48px" }}
              >
                How GMart Works
              </Title>
            </motion.div>
            <Row gutter={[48, 48]}>
              <Col xs={24} md={12}>
                <motion.div variants={fadeInUp}>
                  <Title
                    level={3}
                    style={{ color: "#1890ff", marginBottom: "32px" }}
                  >
                    For Sellers
                  </Title>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ display: "flex" }}
                  >
                    {[
                      {
                        title: "Register Your Account",
                        desc: "Create your seller profile and get verified",
                      },
                      {
                        title: "Browse Products",
                        desc: "Access our wide range of supplier products",
                      },
                      {
                        title: "Start Selling",
                        desc: "List products and start earning profits",
                      },
                    ].map((step, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.stepContainer,
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={styles.stepNumber}>{index + 1}</div>
                        <div style={styles.stepContent}>
                          <Title
                            level={4}
                            style={{ marginTop: 0, marginBottom: "8px" }}
                          >
                            {step.title}
                          </Title>
                          <Text type="secondary">{step.desc}</Text>
                        </div>
                      </div>
                    ))}
                  </Space>
                </motion.div>
              </Col>
              <Col xs={24} md={12}>
                <motion.div variants={fadeInUp}>
                  <Title
                    level={3}
                    style={{ color: "#722ed1", marginBottom: "32px" }}
                  >
                    For Suppliers
                  </Title>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ display: "flex" }}
                  >
                    {[
                      {
                        title: "Register as Supplier",
                        desc: "Complete verification and set up your inventory",
                      },
                      {
                        title: "List Your Products",
                        desc: "Upload products with detailed specifications",
                      },
                      {
                        title: "Fulfill Orders",
                        desc: "Manage inventory and process orders efficiently",
                      },
                    ].map((step, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.stepContainer,
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={styles.stepNumberViolet}>{index + 1}</div>
                        <div style={styles.stepContent}>
                          <Title
                            level={4}
                            style={{ marginTop: 0, marginBottom: "8px" }}
                          >
                            {step.title}
                          </Title>
                          <Text type="secondary">{step.desc}</Text>
                        </div>
                      </div>
                    ))}
                  </Space>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Col>

        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.aboutSection}
          >
            <Row gutter={[32, 32]}>
              <Col span={24}>
                <motion.div variants={fadeInUp}>
                  <Title
                    level={2}
                    style={{ textAlign: "center", marginBottom: "48px" }}
                  >
                    About GMart
                  </Title>
                </motion.div>
              </Col>

              {/* Mission Statement */}
              <Col xs={24} md={8}>
                <motion.div variants={cardVariant}>
                  <Card style={styles.missionCard} bordered={false}>
                    <Title
                      level={3}
                      style={{ color: "#fff", marginBottom: "24px" }}
                    >
                      Our Mission
                    </Title>
                    <Paragraph style={{ color: "#fff", fontSize: "16px" }}>
                      To revolutionize e-commerce by creating seamless
                      connections between suppliers and sellers, empowering
                      businesses of all sizes to thrive in the digital
                      marketplace.
                    </Paragraph>
                    <Space
                      direction="vertical"
                      size={16}
                      style={{ marginTop: "24px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <GlobalOutlined
                          style={{ color: "#fff", fontSize: "20px" }}
                        />
                        <Text style={{ color: "#fff" }}>Global Reach</Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <TeamOutlined
                          style={{ color: "#fff", fontSize: "20px" }}
                        />
                        <Text style={{ color: "#fff" }}>Community Focused</Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <RocketOutlined
                          style={{ color: "#fff", fontSize: "20px" }}
                        />
                        <Text style={{ color: "#fff" }}>Innovation Driven</Text>
                      </div>
                    </Space>
                  </Card>
                </motion.div>
              </Col>

              {/* Key Statistics */}
              <Col xs={24} md={16}>
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12}>
                    <motion.div variants={cardVariant}>
                      <Card style={styles.statCard} bordered={false}>
                        <div style={styles.statNumber}>10K+</div>
                        <Title level={4}>Active Sellers</Title>
                        <Text type="secondary">
                          Trusted by thousands of entrepreneurs worldwide
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <motion.div variants={cardVariant}>
                      <Card style={styles.statCard} bordered={false}>
                        <div style={styles.statNumber}>5K+</div>
                        <Title level={4}>Verified Suppliers</Title>
                        <Text type="secondary">
                          Quality products from certified suppliers
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <motion.div variants={cardVariant}>
                      <Card style={styles.statCard} bordered={false}>
                        <div style={styles.statNumber}>1M+</div>
                        <Title level={4}>Products Listed</Title>
                        <Text type="secondary">
                          Diverse range of products across categories
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <motion.div variants={cardVariant}>
                      <Card style={styles.statCard} bordered={false}>
                        <div style={styles.statNumber}>98%</div>
                        <Title level={4}>Satisfaction Rate</Title>
                        <Text type="secondary">
                          Committed to excellence in service
                        </Text>
                      </Card>
                    </motion.div>
                  </Col>
                </Row>
              </Col>

              {/* Vision */}
              <Col span={24}>
                <motion.div variants={cardVariant}>
                  <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} md={16}>
                      <Title level={3} style={{ marginBottom: "16px" }}>
                        Our Vision for the Future
                      </Title>
                      <Paragraph style={{ fontSize: "16px" }}>
                        At GMart, we envision a future where e-commerce is
                        accessible to everyone. We're building a platform that
                        not only connects businesses but also fosters growth,
                        innovation, and success for all our partners. Through
                        cutting-edge technology and unwavering support, we're
                        making this vision a reality.
                      </Paragraph>
                    </Col>
                    <Col xs={24} md={8} style={{ textAlign: "center" }}>
                      <img
                        src="/api/placeholder/300/200"
                        alt="Vision"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Col>

        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            style={styles.ctaSection}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <Title
                level={2}
                style={{
                  color: "#fff",
                  marginBottom: "24px",
                  fontSize: "2.5rem",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Ready to Get Started?
              </Title>
              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "18px",
                  marginBottom: "40px",
                  maxWidth: "600px",
                  margin: "0 auto 40px",
                }}
              >
                Join thousands of successful sellers and suppliers on GMart
              </Paragraph>
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  style={{
                    background: "#fff",
                    borderColor: "#fff",
                    color: "#4158D0",
                    fontWeight: "500",
                    padding: "0 32px",
                    height: "48px",
                    fontSize: "16px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  Create Seller Account
                </Button>
                <Button
                  ghost
                  size="large"
                  style={{
                    color: "#fff",
                    borderColor: "#fff",
                    padding: "0 32px",
                    height: "48px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Become a Supplier
                </Button>
              </Space>
            </div>
          </motion.div>
        </Col>
        <Col span={24}>
          <CustomFooter />
        </Col>
      </Row>
    </HomeLayout>
  );
}
