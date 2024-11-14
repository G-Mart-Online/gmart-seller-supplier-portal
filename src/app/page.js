"use client";
import HomeCarousel from "@/components/home/content/HomeCarousel";
import HomeLayout from "@/components/home/HomeLayout";
import { getCsrfToken } from "@/services/authService";
import { Col, Row } from "antd";
import { useEffect } from "react";

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
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <HomeCarousel />
        </Col>
      </Row>
      <Row gutter={[30, 30]} justify="center"></Row>
    </HomeLayout>
  );
}
