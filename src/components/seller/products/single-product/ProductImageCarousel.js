import { DownloadOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Divider, Flex, Image, Row, Space } from "antd";
import React, { useRef, useState } from "react";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ProductImageCarousel = ({ images }) => {
  const product = {
    images: [
      "https://images.pexels.com/photos/7290172/pexels-photo-7290172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7290172/pexels-photo-7290172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7290172/pexels-photo-7290172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7290172/pexels-photo-7290172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7290172/pexels-photo-7290172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7290172/pexels-photo-7290172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7290172/pexels-photo-7290172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    carouselRef.current.goTo(index); // Navigate to the selected image in the carousel
  };
  return (
    <>
      <Carousel
        arrows
        infinite={false}
        ref={carouselRef}
        afterChange={(current) => setSelectedIndex(current)}
      >
        {product.images.map((image, index) => (
          <Image
            className="seller-single-product-carousel-img"
            src={image}
            alt="product-img"
            key={index}
          />
        ))}
      </Carousel>
      <Row
        gutter={[4, 4]}
        justify="start"
        style={{
          marginTop: "16px",
        }}
      >
        {product.images.map((image, index) => (
          <Col key={index}>
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "4px",
                cursor: "pointer",
                border:
                  selectedIndex === index
                    ? "2px solid #1890ff"
                    : "1px solid #ddd",
                transition: "border-color 0.3s",
              }}
              preview={false}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={[4, 4]} justify="start">
        <Col span={24}>
          <Divider orientation="left" plain>
            Actions
          </Divider>
        </Col>
        <Col>
          <Button type="primary" icon={<DownloadOutlined />}>
            Images
          </Button>
        </Col>
        <Col>
          <Button type="primary" icon={<DownloadOutlined />}>
            Video
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductImageCarousel;
