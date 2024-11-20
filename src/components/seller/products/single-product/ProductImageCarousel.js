import { DownloadOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Divider, Image, Row } from "antd";
import React, { useRef, useState } from "react";

const ProductImageCarousel = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    carouselRef.current.goTo(index);
  };
  return (
    <>
      <Carousel
        arrows
        infinite={false}
        ref={carouselRef}
        afterChange={(current) => setSelectedIndex(current)}
      >
        {product?.imageUrls?.map((image, index) => (
          <Image
            className="seller-single-product-carousel-img"
            src={image}
            alt="product-img"
            key={index}
            height={300}
            width={"100%"}
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
        {product?.imageUrls?.map((image, index) => (
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
