import { StarOutlined } from "@ant-design/icons";
import { Avatar, Divider, Flex, List, Space, Tag, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const TopSellingProductList = ({ header, products, isLoading }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      header={header}
      bordered
      dataSource={products}
      loading={isLoading}
      renderItem={(item) => (
        <List.Item key={item?.productId}>
          <List.Item.Meta
            avatar={
              <Avatar size={50} shape="square" src={item?.imageUrls[0]} />
            }
            title={
              <Text level={3} ellipsis={true}>
                {item?.productName}
              </Text>
            }
            description={
              <>
                <Flex vertical gap={"small"}>
                  <Space>
                    <Text strong style={{ color: "#52c41a" }}>
                      Rs. {item?.retailPrice?.toFixed(2)}
                    </Text>
                  </Space>
                  <Space wrap>
                    <Text type="secondary">Stock: {item?.stockQuantity}</Text>
                    <Divider type="vertical" />
                    <Text type="secondary">
                      Category: {item?.category?.categoryName}
                    </Text>
                  </Space>

                  <Space>
                    <Tag
                      icon={<StarOutlined twoToneColor="gold" />}
                      color="gold"
                    >
                      Best Seller
                    </Tag>
                  </Space>
                </Flex>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default TopSellingProductList;
