import { PlayCircleOutlined } from "@ant-design/icons";
import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import React, { useRef, useState } from "react";

const SupplierProductImageCarousel = ({ product }) => {
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
            height={600}
            width={600}
          />
        ))}
        <video width="100%" height="600" controls>
          <source src={product.videoUrl} type="video/mp4" />
          Your browser does not support the video.
        </video>
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
              width={50}
              height={50}
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
            />
          </Col>
        ))}
        {product?.videoUrl && (
          <Col>
            <div
              onClick={() => handleThumbnailClick(product.imageUrls.length)}
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                cursor: "pointer",
                border:
                  selectedIndex === product.imageUrls.length
                    ? "2px solid #1890ff"
                    : "1px solid #ddd",
                transition: "border-color 0.3s",
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              <PlayCircleOutlined style={{ fontSize: "20px" }} />
            </div>
          </Col>
        )}
      </Row>
    </>
  );
};

export default SupplierProductImageCarousel;
