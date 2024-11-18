import { ShopOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Flex, Row, Tag, Typography } from "antd";

import React from "react";

const { Text, Paragraph } = Typography;

const ProductDetails = ({ product }) => {
  const value = 1565.67;

  return (
    <>
      <Row gutter={[12, 12]} justify="start">
        <Col span={24}>
          <Flex gap="small" align="center">
            <Avatar icon={<ShopOutlined />} />
            <Text type="secondary">Shop Name</Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Typography.Title level={5} copyable>
            Product Name
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">Sold by SupplierName</Text>
        </Col>
        <Col span={24}>
          <Text style={{ fontSize: "24px" }} copyable>
            Rs. {value.toFixed(2)}
          </Text>
        </Col>
        <Col span={24}>
          <Flex gap="small">
            <Text type="secondary">Quantity:</Text>
            <Text copyable>12</Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex gap="small">
            <Text type="secondary">Category:</Text>
            <Tag>
              <Text copyable>Category Name</Text>
            </Tag>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex gap="small">
            <Text type="secondary" style={{ whiteSpace: "nowrap" }}>
              SEO Tags:
            </Text>
            <Paragraph copyable style={{ flex: 1, marginBottom: "0px" }}>
              tag1, tag2, tag3, tag1, tag2, tag3,tag1, tag2, tag3,tag1, tag2,
              tag3, tag1, tag2, tag3, tag1, tag2, tag3,tag1, tag2, tag3,tag1,
              tag2, tag3
            </Paragraph>
          </Flex>
        </Col>
        <Col span={24}>
          <Divider orientation="left" plain>
            Product Description
          </Divider>
        </Col>
        <Col>
          <Paragraph>
            As designers, we are frequently and incorrectly reminded that our
            job is to “make things pretty.” We are indeed designers — not
            artists — and there is no place for formalism in good design. Web
            design has a function, and that function is to communicate the
            message for which the Web page was conceived. The medium is not the
            message. Never is this principle more pertinent than when dealing
            with type, the bread and butter of Web-borne communication. A
            well-set paragraph of text is not supposed to wow the reader; the
            wowing should be left to the idea or observation for which the
            paragraph is a vehicle. In fact, the perfect paragraph is unassuming
            to the point of near invisibility. That is not to say that the
            appearance of your text should have no appeal at all. On the
            contrary: well-balanced, comfortably read typography is a thing of
            beauty; it’s just not the arresting sort of beauty that might
            distract you from reading.
          </Paragraph>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
