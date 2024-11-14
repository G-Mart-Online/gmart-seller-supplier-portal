import React from "react";
import { Button, Flex, Typography } from "antd";
import { GoogleCircleFilled, GoogleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getProviderLoginUrl } from "@/utils/socialLoginsUtils";

const { Text } = Typography;

const SocialLogin = () => {
  return (
    <Flex gap="small" vertical>
      <Text type="secondary">Or, log in with</Text>
      <Link href={getProviderLoginUrl("google")}>
        <Button icon={<GoogleOutlined />} style={{ width: 100 }}>
          Google
        </Button>
      </Link>
    </Flex>
  );
};

export default SocialLogin;
