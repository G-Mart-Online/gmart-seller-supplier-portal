"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Statistic, Tooltip, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const { Meta } = Card;

const SupplierProductCard = ({ product }) => {
  return (
    <Card
      className="seller-product-card"
      hoverable
      cover={
        <Image
          src={product.imageUrls[0]}
          width={100}
          height={200}
          alt="product-img"
          className="seller-product-card-img"
        />
      }
      size="small"
    >
      <Meta
        style={{ padding: 0 }}
        title={product.productName}
        description={
          <Flex vertical gap="small">
            <Typography type="secondary" className="seller-product-card-desc">
              {product.description}
            </Typography>
            {/* <Tooltip title={`Retail Price Rs. ${product.retailPrice}`}> */}
            <Statistic
              className="seller-product-card-stat"
              value={product.retailPrice}
              precision={2}
              prefix="Rs."
              valueStyle={{ color: "#3f8600", fontSize: "14px" }}
            />
            {/* </Tooltip> */}
            {/* <Tooltip title={`Wholesale Price Rs. ${product.wholesalePrice}`}> */}
            <Statistic
              className="seller-product-card-stat"
              value={product.wholesalePrice}
              precision={2}
              prefix="Rs."
              suffix="(Wholesale)"
              valueStyle={{ color: "gray", fontSize: "12px" }}
            />
            {/* </Tooltip> */}

            <Tooltip title="View product details">
              <Link href={`products/${product.productId}`}>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  className="seller-product-card-btn"
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

export default SupplierProductCard;
