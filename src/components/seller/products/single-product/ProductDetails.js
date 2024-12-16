import { ShopOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Flex, Row, Space, Tag, Typography } from "antd";

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
          <Typography.Title level={2} copyable style={{ margin: 0 }}>
            {product?.productName}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">
            {product?.supplier?.firstName + " " + product?.supplier?.lastName}
          </Text>
        </Col>
        <Col span={24}>
          <Text style={{ fontSize: "24px" }} copyable>
            Rs. {product?.retailPrice?.toFixed(2)}
          </Text>
        </Col>
        <Col span={24}>
          <Flex gap="small" vertical>
            <Text type="secondary">Quantity:</Text>
            <Text copyable style={{ fontSize: "20px" }}>
              {product?.stockQuantity}
            </Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex gap="small" vertical justify="flex-start">
            <Text type="secondary">Category:</Text>
            <Flex>
              <Tag color="green">
                <Text copyable style={{ fontSize: "14px" }}>
                  {product?.category?.categoryName}
                </Text>
              </Tag>
            </Flex>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex gap="small" vertical>
            <Text className="product-detail-label" type="secondary">
              SEO Tags:
            </Text>
            <Flex wrap gap="small">
              {product?.seoTags?.map((tag, index) => (
                <Tag key={index} color="blue" style={{ cursor: "pointer" }}>
                  <Text copyable style={{ fontSize: "14px" }}>
                    {tag}
                  </Text>
                </Tag>
              ))}
            </Flex>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
