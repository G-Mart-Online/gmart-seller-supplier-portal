"use client";
import { Carousel } from "antd";
import React from "react";
import "../../../assets/styles/home-styles.css";

const contentStyle = {
  margin: 0,
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeCarousel = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 className="carousel-content"></h3>
      </div>
      <div>
        <h3 className="carousel-content"></h3>
      </div>
      <div>
        <h3 className="carousel-content"></h3>
      </div>
      <div>
        <h3 className="carousel-content"></h3>
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
