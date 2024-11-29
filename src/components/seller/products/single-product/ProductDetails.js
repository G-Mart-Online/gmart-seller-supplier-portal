import { ShopOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Flex, Row, Tag, Typography } from "antd";

import React from "react";

const { Text, Paragraph } = Typography;

const ProductDetails = ({ product }) => {
  return (
    <>
      <Row gutter={[12, 12]} justify="start">
        <Col span={24}>
          <Flex gap="small" align="center">
            <Avatar icon={<ShopOutlined />} />
            <Text type="secondary">{product?.supplier?.companyName}</Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Typography.Title level={5} copyable>
            {product?.productName}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">{product?.supplier?.firstName}</Text>
        </Col>
        <Col span={24}>
          <Text style={{ fontSize: "24px" }} copyable>
            Rs. {product?.retailPrice?.toFixed(2)}
          </Text>
        </Col>
        <Col span={24}>
          <Flex gap="small">
            <Text type="secondary">Quantity:</Text>
            <Text copyable>{product?.stockQuantity}</Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex gap="small">
            <Text type="secondary">Category:</Text>
            <Tag>
              <Text copyable>{product?.category?.categoryName}</Text>
            </Tag>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex gap="small">
            <Text className="product-detail-label" type="secondary">
              SEO Tags:
            </Text>
            <Paragraph className="product-details-para" copyable>
              {product?.seoTags?.map((item) => item)}
            </Paragraph>
          </Flex>
        </Col>
        <Col span={24}>
          <Divider orientation="left" plain>
            Product Description
          </Divider>
        </Col>
        <Col>
          <Paragraph>{product?.description}</Paragraph>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
