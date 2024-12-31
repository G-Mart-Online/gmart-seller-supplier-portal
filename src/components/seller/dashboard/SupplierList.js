import { ArrowUpOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Tooltip, Typography } from "antd";
import React from "react";

const SupplierList = ({ header, suppliers, isLoading }) => {
  const IconText = ({ icon, text, tooltip }) => (
    <Space>
      <Tooltip title={tooltip}>
        {React.createElement(icon)}
        {text}
      </Tooltip>
    </Space>
  );
  return (
    <List
      itemLayout="vertical"
      size="large"
      header={header}
      bordered
      dataSource={suppliers}
      loading={isLoading}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={ArrowUpOutlined}
              text={`${item.supplierLevel}` || "N/A"}
              tooltip="Supplier Level"
              key="list-vertical-level-o"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"></Avatar>
            }
            title={<Typography>{item.companyName}</Typography>}
            description={`By ${item.firstName} ${item.lastName}`}
          />
        </List.Item>
      )}
    />
  );
};

export default SupplierList;
