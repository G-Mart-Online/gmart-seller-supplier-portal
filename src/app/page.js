"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Alert, Button, Col, Layout, Row } from "antd";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Row gutter={[30, 30]} justify="center">
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Alert message="Welcome to GMart. Coming Soon..." banner />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
