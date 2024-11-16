"use client";

import SellerProductContent from "@/components/seller/products/SellerProductContent";
import SellerPageContainer from "@/components/seller/SellerPageContainer";
import SellerPageTitle from "@/components/seller/SellerPageTitle";
import { fetchProducts } from "@/services/productService";
import { ProductFilled } from "@ant-design/icons";
import { Col, Divider, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;

const tempProducts = [
  {
    productId: "P001",
    productName: "Product 01",
    description: "High-quality leather wallet for men.",
    stockQuantity: 50,
    wholesalePrice: 15.99,
    retailPrice: 24.99,
    imageUrls: [
      "https://img.freepik.com/free-psd/black-friday-big-sale-social-media-post-design-template_47987-17474.jpg?t=st=1731697942~exp=1731701542~hmac=58b82c1c5663a28473004fbb906ec89d2e0761b742270f644a9c61e72b3d38ad&w=1480",
      "https://example.com/images/wallet2.jpg",
    ],
    videoUrl: "https://example.com/videos/wallet.mp4",
    seoTags: ["leather wallet", "men's accessories", "durable wallet"],
    status: true,
    supplier_Id: "S001",
    category_Id: "C001",
  },
  {
    productId: "P002",
    productName: "Product 02",
    description: "Stainless steel water bottle with insulation.",
    stockQuantity: 120,
    wholesalePrice: 8.49,
    retailPrice: 12.99,
    imageUrls: [
      "https://images.pexels.com/photos/3577294/pexels-photo-3577294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://example.com/images/bottle2.jpg",
    ],
    videoUrl: "https://example.com/videos/bottle.mp4",
    seoTags: ["water bottle", "insulated bottle", "stainless steel bottle"],
    status: true,
    supplier_Id: "S002",
    category_Id: "C002",
  },
  {
    productId: "P003",
    productName: "Product 03 Looooooooooooooooong ds",
    description: "Bluetooth wireless earbuds with noise cancellation.",
    stockQuantity: 30,
    wholesalePrice: 45.0,
    retailPrice: 79.99,
    imageUrls: [
      "https://images.pexels.com/photos/3577294/pexels-photo-3577294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://example.com/images/earbuds2.jpg",
    ],
    videoUrl: "https://example.com/videos/earbuds.mp4",
    seoTags: [
      "wireless earbuds",
      "bluetooth headphones",
      "noise-cancelling earbuds",
    ],
    status: true,
    supplier_Id: "S003",
    category_Id: "C003",
  },
  {
    productId: "P004",
    productName: "Product 04",
    description: "Ergonomic office chair with lumbar support.",
    stockQuantity: 15,
    wholesalePrice: 9900000.99,
    retailPrice: 1000000.99,
    imageUrls: [
      "https://images.pexels.com/photos/3577294/pexels-photo-3577294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://example.com/images/chair2.jpg",
    ],
    videoUrl: "https://example.com/videos/chair.mp4",
    seoTags: ["office chair", "ergonomic chair", "lumbar support"],
    status: true,
    supplier_Id: "S004",
    category_Id: "C004",
  },
  {
    productId: "P005",
    productName: "Product 05",
    description: "Smartphone tripod with remote shutter.",
    stockQuantity: 75,
    wholesalePrice: 12.5,
    retailPrice: 19.99,
    imageUrls: [
      "https://images.pexels.com/photos/3577294/pexels-photo-3577294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://example.com/images/tripod2.jpg",
    ],
    videoUrl: "https://example.com/videos/tripod.mp4",
    seoTags: ["smartphone tripod", "remote shutter tripod", "portable tripod"],
    status: true,
    supplier_Id: "S005",
    category_Id: "C005",
  },
];

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const fetchProductsList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error while fetching products:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <SellerPageTitle icon={<ProductFilled />} pageTitle="Products" />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <Select
            onChange={(value) => console.log("category selected::", value)}
            style={{ width: "100%" }}
            options={[
              { value: "category1", label: "Category 1" },
              { value: "category2", label: "Category 2" },
              { value: "category3", label: "Category 3" },
              { value: "category4", label: "Category 4", disabled: true },
            ]}
            placeholder="Select a Category"
            allowClear
            size="large"
            loading={isLoading}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <Search
            placeholder="Search Products"
            allowClear
            enterButton
            onSearch={onSearch}
            size="large"
            loading={isLoading}
          />
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer
        childern={
          <SellerProductContent
            isLoading={isLoading}
            products={products}
            error={error}
          />
        }
      />
    </>
  );
};

export default ProductPage;
