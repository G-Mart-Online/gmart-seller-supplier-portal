"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CustomFooter from "@/components/common/CustomFooter";
import HomeLayout from "@/components/home/HomeLayout";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

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
    padding: "64px 24px",
    background: "linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%)",
    borderRadius: "12px",
    marginBottom: "32px",
  },
  formSection: {
    padding: "48px 24px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  infoCard: {
    height: "100%",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(24, 144, 255, 0.1)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 24px rgba(24, 144, 255, 0.1)",
    },
  },
  icon: {
    fontSize: "28px",
    color: "#1890ff",
    marginBottom: "16px",
  },
  mapContainer: {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  infoItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  formButton: {
    height: "48px",
    fontSize: "16px",
    padding: "0 32px",
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

const ContactUsPage = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = (values) => {
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      message.success("Thank you! Your message has been sent successfully.");
      form.resetFields();
    }, 1500);
  };

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
                Contact Us
              </Title>
              <Paragraph
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                Have questions or need assistance? We're here to help you every
                step of the way.
              </Paragraph>
            </motion.div>
          </motion.div>
        </Col>

        {/* Main Content */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={styles.section}
          >
            <Row gutter={[48, 48]}>
              {/* Contact Information */}
              <Col xs={24} lg={10}>
                <motion.div variants={fadeInUp}>
                  <Title level={2} style={{ marginBottom: "32px" }}>
                    Get in Touch
                  </Title>
                  <div style={styles.contactInfo}>
                    <div style={styles.infoItem}>
                      <EnvironmentOutlined
                        style={{ ...styles.icon, marginTop: "4px" }}
                      />
                      <div>
                        <Title level={4} style={{ marginBottom: "8px" }}>
                          Our Location
                        </Title>
                        <Text>
                          123 Commerce Plaza, Silicon Valley, CA 94123, United
                          States
                        </Text>
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <MailOutlined
                        style={{ ...styles.icon, marginTop: "4px" }}
                      />
                      <div>
                        <Title level={4} style={{ marginBottom: "8px" }}>
                          Email Address
                        </Title>
                        <Text>support@gmart.com</Text>
                        <br />
                        <Text>info@gmart.com</Text>
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <PhoneOutlined
                        style={{ ...styles.icon, marginTop: "4px" }}
                      />
                      <div>
                        <Title level={4} style={{ marginBottom: "8px" }}>
                          Phone Numbers
                        </Title>
                        <Text>Customer Service: +1 (800) 123-4567</Text>
                        <br />
                        <Text>Technical Support: +1 (800) 987-6543</Text>
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <ClockCircleOutlined
                        style={{ ...styles.icon, marginTop: "4px" }}
                      />
                      <div>
                        <Title level={4} style={{ marginBottom: "8px" }}>
                          Working Hours
                        </Title>
                        <Text>Monday - Friday: 9:00 AM - 6:00 PM (PST)</Text>
                        <br />
                        <Text>Saturday: 10:00 AM - 2:00 PM (PST)</Text>
                        <br />
                        <Text>Sunday: Closed</Text>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>

              {/* Contact Form */}
              <Col xs={24} lg={14}>
                <motion.div variants={fadeInUp}>
                  <div style={styles.formSection}>
                    <Title level={3} style={{ marginBottom: "24px" }}>
                      <MessageOutlined
                        style={{ marginRight: "12px", color: "#1890ff" }}
                      />
                      Send Us a Message
                    </Title>

                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={onFinish}
                      scrollToFirstError
                    >
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="name"
                            label="Full Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your name",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter your full name"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="email"
                            label="Email Address"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your email",
                              },
                              {
                                type: "email",
                                message: "Please enter a valid email",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter your email address"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your phone number",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter your phone number"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="subject"
                            label="Subject"
                            rules={[
                              {
                                required: true,
                                message: "Please select a subject",
                              },
                            ]}
                          >
                            <Select size="large" placeholder="Select a subject">
                              <Option value="general">General Inquiry</Option>
                              <Option value="support">Technical Support</Option>
                              <Option value="sales">Sales Information</Option>
                              <Option value="partnership">
                                Partnership Opportunities
                              </Option>
                              <Option value="feedback">Feedback</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="message"
                        label="Message"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your message",
                          },
                        ]}
                      >
                        <TextArea
                          rows={6}
                          placeholder="Enter your message here..."
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={submitting}
                          style={styles.formButton}
                        >
                          Send Message
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Col>

        {/* Map Section */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "32px" }}
            >
              Find Us On The Map
            </Title>
            <div style={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </Col>

        {/* FAQ Section */}
        <Col span={24}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={{ ...styles.section, marginTop: "32px" }}
          >
            <Title
              level={2}
              style={{ textAlign: "center", marginBottom: "48px" }}
            >
              Frequently Asked Questions
            </Title>

            <Row gutter={[24, 24]}>
              {[
                {
                  question: "How quickly can I expect a response?",
                  answer:
                    "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please contact our customer service hotline.",
                },
                {
                  question: "Do you offer technical support on weekends?",
                  answer:
                    "We offer limited technical support on Saturdays from 10 AM to 2 PM (PST). For critical issues, we have an emergency contact system for our verified sellers and suppliers.",
                },
                {
                  question: "Can I schedule a meeting with your team?",
                  answer:
                    "Yes, you can request a meeting through our contact form. Please select 'Partnership Opportunities' as the subject and provide your preferred dates and times in the message.",
                },
                {
                  question: "How can I become a verified supplier?",
                  answer:
                    "To become a verified supplier, please use our contact form with the subject 'Partnership Opportunities' and our business development team will reach out with the verification process details.",
                },
              ].map((faq, index) => (
                <Col xs={24} md={12} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card style={styles.infoCard}>
                      <Title level={4} style={{ marginBottom: "16px" }}>
                        {faq.question}
                      </Title>
                      <Paragraph style={{ color: "rgba(0, 0, 0, 0.65)" }}>
                        {faq.answer}
                      </Paragraph>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Col>

        {/* Footer */}
        <Col span={24}>
          <CustomFooter />
        </Col>
      </Row>
    </HomeLayout>
  );
};

export default ContactUsPage;
