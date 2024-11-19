"use client";
import { Carousel } from "antd";
import React from "react";
import "../../../assets/styles/home-styles.css";
import Image from "next/image";
import CarouselImg1 from "../../../assets/images/carousel_img_1.jpg";
import CarouselImg2 from "../../../assets/images/carousel_img_2.jpg";

const HomeCarousel = () => {
  return (
    <Carousel autoplay arrows>
      <div className="carousel-image-container">
        <Image
          className="carousel-content"
          src={CarouselImg1}
          alt="Carousel Image 01"
          fill
        />
      </div>
      <div className="carousel-image-container">
        <Image
          className="carousel-content"
          src={CarouselImg2}
          alt="Carousel Image 01"
          fill
        />
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
