import { ArrowUpOutlined } from "@ant-design/icons";
import { Avatar, Flex, List, Space, Tag, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const TopSellerList = ({ header, sellers, isLoading }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      header={header}
      bordered
      dataSource={sellers}
      loading={isLoading}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={
              <Avatar
                size={50}
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              />
            }
            title={
              <Text level={3} ellipsis={true}>
                {item?.firstname} {item?.lastname}
              </Text>
            }
            description={
              <>
                <Flex vertical gap={"small"}>
                  <Space>
                    <Tag
                      color="green"
                      icon={<ArrowUpOutlined twoToneColor="green" />}
                    >
                      Level {item?.sellerLevel}
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

export default TopSellerList;
