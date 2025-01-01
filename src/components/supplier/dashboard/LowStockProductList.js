import { WarningOutlined } from "@ant-design/icons";
import { Flex, Image, List, Space, Tag, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const LowStockProductList = ({ header, products, isLoading }) => {
  const getStatus = (stock, threshold) => {
    if (stock === 0) return "Out of Stock";
    if (stock < threshold) return "Low Stock";
    return "In Stock";
  };

  const getStatusColor = (stock, threshold) => {
    if (stock === 0) return "red";
    if (stock < threshold) return "orange";
    return "green";
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      header={header}
      bordered
      dataSource={products}
      loading={isLoading}
      renderItem={(item) => (
        <List.Item key={item.productId}>
          <List.Item.Meta
            avatar={
              <Image
                src={item?.imageUrls[0]}
                width={50}
                height={50}
                alt="product-img"
                style={{ borderRadius: "8px" }}
                preview={false}
              />
            }
            title={
              <Text level={3} ellipsis={true}>
                {item.productName}
              </Text>
            }
            description={
              <>
                <Flex vertical gap={"small"}>
                  <Text type="secondary">
                    Stock: {item?.stockQuantity} (Threshold: 100)
                  </Text>
                  <Space>
                    <Tag
                      icon={
                        <WarningOutlined
                          twoToneColor={getStatusColor(
                            item?.stockQuantity,
                            100
                          )}
                        />
                      }
                      color={getStatusColor(item?.stockQuantity, 100)}
                    >
                      {getStatus(item?.stockQuantity, 100)}
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

export default LowStockProductList;
