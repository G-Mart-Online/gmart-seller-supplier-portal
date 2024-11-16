"use client";
import { EyeOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Flex,
  Statistic,
  Tooltip,
  Typography,
} from "antd";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={
        <Image
          src={product.imageUrls[0]}
          width={100}
          height={200}
          alt="product-img"
          style={{
            objectFit: "cover",
            borderRadius: "9px",
          }}
        />
      }
      style={{ padding: "10px" }}
      size="small"
    >
      <Meta
        style={{ padding: 0 }}
        title={product.productName}
        description={
          <Flex vertical gap="small">
            <Typography
              type="secondary"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                minHeight: "3em", // Ensures two lines height
              }}
            >
              {product.description}
            </Typography>
            <Tooltip title={`Retail Price Rs. ${product.retailPrice}`}>
              <Statistic
                value={product.retailPrice}
                precision={2}
                prefix="Rs."
                valueStyle={{ color: "#3f8600", fontSize: "14px" }}
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  minHeight: "1em", // Ensures two lines height
                }}
              />
            </Tooltip>
            <Tooltip title={`Wholesale Price Rs. ${product.wholesalePrice}`}>
              <Statistic
                value={product.wholesalePrice}
                precision={2}
                prefix="Rs."
                suffix="(Wholesale)"
                valueStyle={{ color: "gray", fontSize: "12px" }}
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  minHeight: "1em", // Ensures two lines height
                }}
              />
            </Tooltip>

            <Tooltip title="View product details">
              <Link href="/product/[id]" as={`/product/P001`}>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  style={{ width: "100%" }}
                >
                  View
                </Button>
              </Link>
            </Tooltip>
          </Flex>
        }
      />
    </Card>
  );
};

export default ProductCard;
