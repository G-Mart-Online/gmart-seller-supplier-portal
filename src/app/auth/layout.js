"use client";
import { Layout } from "antd";
import React from "react";
import "../../assets/styles/home-styles.css";
import HomeLayout from "@/components/home/HomeLayout";

const { Content } = Layout;

const layout = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default layout;
