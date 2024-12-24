import { ShopOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Row, Space, Tag, Typography } from "antd";

import React from "react";

const { Text, Title } = Typography;

const ProductDetails = ({ product }) => {
  return (
    <>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space align="center">
              <Avatar icon={<ShopOutlined />} size={40} />
              <div>
                <Text strong>{product?.supplier?.companyName}</Text>
                <br />
                <Text type="secondary">
                  {product?.supplier?.firstName} {product?.supplier?.lastName}
                </Text>
              </div>
            </Space>
          </Col>
          <Divider style={{ margin: "12px 0" }} />
          <Col span={24}>
            <Title level={3} style={{ margin: 0 }} copyable>
              {product?.productName}
            </Title>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Space direction="vertical">
              <Text type="secondary">Retail Price</Text>
              <Title level={4} style={{ margin: 0 }}>
                Rs. {product?.retailPrice?.toFixed(2)}
              </Title>
            </Space>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Space direction="vertical">
              <Text type="secondary">Wholesale Price</Text>
              <Title level={4} style={{ margin: 0 }}>
                Rs. {product?.wholesalePrice?.toFixed(2)}
              </Title>
            </Space>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Space direction="vertical">
              <Text type="secondary">Min Wholesale Quantity</Text>
              <Title level={5} style={{ margin: 0 }}>
                {product?.wholeSaleMinQuantity}
              </Title>
            </Space>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Space direction="vertical">
              <Text type="secondary">Stock Quantity</Text>
              <Title level={5} style={{ margin: 0 }}>
                {product?.stockQuantity}
              </Title>
            </Space>
          </Col>
          <Divider style={{ margin: "12px 0" }} />
          <Col span={24}>
            <Space direction="vertical">
              <Text type="secondary">Category</Text>
              <Tag
                color="green"
                style={{ fontSize: "14px", padding: "4px 8px" }}
              >
                <Text copyable>{product?.category?.categoryName}</Text>
              </Tag>
            </Space>
          </Col>
          {product?.seoTags?.length > 0 && (
            <Col span={24}>
              <Space direction="vertical">
                <Text type="secondary">SEO Tags</Text>
                <Space wrap>
                  {product.seoTags.map((tag, index) => (
                    <Tag key={index} color="blue" style={{ fontSize: "14px" }}>
                      <Text copyable>{tag}</Text>
                    </Tag>
                  ))}
                </Space>
              </Space>
            </Col>
          )}
        </Row>
      </Card>
    </>
  );
};

export default ProductDetails;
