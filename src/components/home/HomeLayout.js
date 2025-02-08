"use client";
import { Layout } from "antd";
import React from "react";
import Navbar from "./Navbar";
import "../../assets/styles/home-styles.css";

const { Header, Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header
        className="header"
        style={{
          backgroundColor: "white",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Navbar />
      </Header>
      <Content className="content">{children}</Content>
    </Layout>
  );
};

export default HomeLayout;
