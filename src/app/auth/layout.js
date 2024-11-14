"use client";

import React from "react";
import "../../assets/styles/home-styles.css";
import HomeLayout from "@/components/home/HomeLayout";

const layout = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default layout;
