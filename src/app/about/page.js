"use client";
import { motion } from "framer-motion";
import CustomFooter from "@/components/common/CustomFooter";
import HomeLayout from "@/components/home/HomeLayout";
import {
  GlobalOutlined,
  HeartOutlined,
  SmileOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography, Timeline } from "antd";
import TeamImg from "../../assets/images/about-us-team.jpg";
import PersonImg from "../../assets/images/person.jpg";
import Image from "next/image";

const { Title, Paragraph, Text } = Typography;

const styles = {
  container: {
    padding: "40px 24px",
  },
  heroSection: {
    minHeight: "400px",
    background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)",
    padding: "48px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "12px",
  },
  section: {
    padding: "64px 0px",
  },
  card: {
    height: "100%",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 24px rgba(24, 144, 255, 0.1)",
    },
  },
  valueCard: {
    textAlign: "center",
    padding: "8px",
    height: "100%",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(24, 144, 255, 0.1)",
  },
  icon: {
    fontSize: "36px",
    color: "#1890ff",
    marginBottom: "24px",
  },
  timelineSection: {
    background: "linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%)",
    padding: "48px",
    borderRadius: "12px",
    padding: "64px 0px",
  },
  teamSection: {
    background:
      "linear-gradient(135deg, #ffffff 0%, #f0f7ff 50%, #e6f4ff 100%)",
    padding: "48px",
    borderRadius: "12px",
    padding: "64px 24px",
  },
  teamCard: {
    textAlign: "center",
    height: "100%",
  },
  profileImage: {
    // width: "120px",
    // height: "120px",
    borderRadius: "60px",
    marginBottom: "16px",
    objectFit: "cover",
  },
  statsSection: {
    background:
      "linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    padding: "48px",
    borderRadius: "12px",
    color: "white",
    padding: "64px 24px",
  },
  statCard: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
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

const AboutUsPage = () => {
  const coreValues = [
    {
      icon: <GlobalOutlined />,
      title: "Global Reach",
      description:
        "Connecting businesses across borders, creating opportunities worldwide",
    },
    {
      icon: <HeartOutlined />,
      title: "Customer First",
      description:
        "Dedicated to providing exceptional service and support to our community",
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: "Trust & Security",
      description:
        "Maintaining the highest standards of security and reliability",
    },
    {
      icon: <SmileOutlined />,
      title: "User Experience",
      description: "Creating seamless and enjoyable experiences for all users",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: PersonImg,
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: PersonImg,
    },
    {
      name: "Emma Williams",
      role: "Head of Operations",
      image: PersonImg,
    },
  ];

  return (
    <HomeLayout>
      <Row gutter={[30, 30]} justify="start">
        {/* Hero Section */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            style={styles.heroSection}
          >
            <motion.div variants={fadeInUp}>
              <Title style={{ color: "#fff", marginBottom: "24px" }}>
                About GMart
              </Title>
              <Paragraph
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                Building the future of e-commerce by connecting suppliers and
                sellers worldwide
              </Paragraph>
            </motion.div>
          </motion.div>
        </Col>

        {/* Mission Section */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.section}
          >
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <motion.div variants={fadeInUp}>
                  <Title level={2}>Our Mission</Title>
                  <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                    At GMart, we're on a mission to revolutionize the e-commerce
                    landscape by creating seamless connections between suppliers
                    and sellers. We believe in empowering businesses of all
                    sizes to thrive in the digital marketplace through
                    innovative solutions and unwavering support.
                  </Paragraph>
                </motion.div>
              </Col>
              <Col xs={24} md={12}>
                <motion.div variants={fadeInUp}>
                  <Image
                    src={TeamImg}
                    alt="Our Mission"
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                    // width={100}
                    height={300}
                  />
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Col>

        {/* Core Values */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.section}
          >
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "48px" }}
            >
              Our Core Values
            </Title>
            <Row gutter={[32, 32]}>
              {coreValues.map((value, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card style={styles.valueCard} bordered={false}>
                      <div style={styles.icon}>{value.icon}</div>
                      <Title level={4}>{value.title}</Title>
                      <Text type="secondary">{value.description}</Text>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Col>

        {/* Timeline Section */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.timelineSection}
          >
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "48px" }}
            >
              Our Journey
            </Title>
            <motion.div variants={fadeInUp}>
              <Timeline
                mode="alternate"
                items={[
                  {
                    color: "#1890ff",
                    children: (
                      <>
                        <Title level={4}>2020</Title>
                        <Text type="secondary">
                          GMart was founded with a vision to transform
                          e-commerce
                        </Text>
                      </>
                    ),
                  },
                  {
                    color: "#722ed1",
                    children: (
                      <>
                        <Title level={4}>2021</Title>
                        <Text type="secondary">
                          Expanded to 10+ countries with 1000+ active sellers
                        </Text>
                      </>
                    ),
                  },
                  {
                    color: "#1890ff",
                    children: (
                      <>
                        <Title level={4}>2022</Title>
                        <Text type="secondary">
                          Launched innovative supplier verification system
                        </Text>
                      </>
                    ),
                  },
                  {
                    color: "#722ed1",
                    children: (
                      <>
                        <Title level={4}>2023</Title>
                        <Text type="secondary">
                          Achieved 1M+ products listed on the platform
                        </Text>
                      </>
                    ),
                  },
                ]}
              />
            </motion.div>
          </motion.div>
        </Col>

        {/* Team Section */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.teamSection}
          >
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "48px" }}
            >
              Meet Our Team
            </Title>
            <Row gutter={[32, 32]}>
              {teamMembers.map((member, index) => (
                <Col xs={24} sm={8} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card style={styles.teamCard} bordered={false}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        style={styles.profileImage}
                        width={120}
                        height={120}
                      />
                      <Title level={4} style={{ marginBottom: "8px" }}>
                        {member.name}
                      </Title>
                      <Text type="secondary">{member.role}</Text>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Col>

        {/* Stats Section */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.statsSection}
          >
            <Row gutter={[32, 32]}>
              {[
                { number: "10K+", label: "Active Sellers" },
                { number: "5K+", label: "Verified Suppliers" },
                { number: "1M+", label: "Products Listed" },
                { number: "98%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <motion.div variants={fadeInUp}>
                    <div style={styles.statCard}>
                      <Title level={2} style={{ color: "white", margin: 0 }}>
                        {stat.number}
                      </Title>
                      <Text style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                        {stat.label}
                      </Text>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Col>
        <Col span={24}>
          <CustomFooter />
        </Col>
      </Row>
    </HomeLayout>
  );
};

export default AboutUsPage;
