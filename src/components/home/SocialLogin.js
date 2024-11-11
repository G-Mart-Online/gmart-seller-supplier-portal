import React from "react";
import { Button, Flex, Typography } from "antd";
import { GoogleCircleFilled, GoogleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SocialLogin = () => {
  return (
    <Flex gap="small" vertical>
      <Text type="secondary">Or, log in with</Text>
      <Button icon={<GoogleOutlined />} style={{ width: 100 }}>
        Google
      </Button>
    </Flex>
  );
};

export default SocialLogin;
