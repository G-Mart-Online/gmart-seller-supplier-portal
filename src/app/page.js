import HomeCarousel from "@/components/home/content/HomeCarousel";
import SearchBar from "@/components/home/content/SearchBar";
import { Col, Row } from "antd";

export default function Home() {
  return (
    <>
      <Row gutter={[30, 30]} justify="start">
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <SearchBar />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <HomeCarousel />
        </Col>
      </Row>
      <Row gutter={[30, 30]} justify="center"></Row>
    </>
  );
}
