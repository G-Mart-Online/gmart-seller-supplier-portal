import { createSellerAccount } from "@/services/sellerService";
import useAuthGuard from "@/utils/useAuthGuard";
import useNotification from "@/utils/useNotification";
import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
  UploadOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography, Upload } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

const SellerForm = ({ prev, userId }) => {
  const { mutate } = useAuthGuard({ middleware: "auth" });
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification, contextHolder } = useNotification();

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const response = await createSellerAccount(userId, values);
      mutate();
    } catch (error) {
      openNotification(
        "error",
        "Error",
        "An unexpected error occurred while processing your request. Please try again later."
      );
      console.error("Error occurred while creating seller account", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = ({ errorFields }) => {
    errorFields.forEach((field) => {
      openNotification(
        "error",
        "Validation Error",
        `${field.errors.join(", ")}`,
        "topRight"
      );
    });
  };

  return (
    <>
      {contextHolder}
      <Row
        className="account-setup-main-row"
        gutter={[16, 16]}
        justify="center"
      >
        <Col span={24}>
          <Title level={5}>Tell us more about your selling details!</Title>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form
            name="seller-account-setup"
            className="seller-account-setup-form"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="whatsappNumber"
              label="WhatsApp Number"
              rules={[
                {
                  required: true,
                  message: "whatsapp number is required!",
                },
                {
                  pattern: /^[+]?[0-9]{1,15}$/,
                  message: "Please enter a valid WhatsApp number!",
                },
              ]}
            >
              <Input
                placeholder="WhatsApp No..."
                prefix={<WhatsAppOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="nicImageUrl"
              label="Upload Your ID Card"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Please upload a clear and high-quality image of your ID card (e.g., license, passport, or other identification). Accepted formats: JPG, PNG."
              // rules={[
              //   {
              //     required: true,
              //     message: "id is required!",
              //   },
              // ]}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            {/* Bank Account Details */}
            <Form.Item label="Bank Account Details">
              <Form.Item
                label="Account Number"
                name={["bankAccountDetails", "accountNumber"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the account number",
                  },
                ]}
              >
                <Input placeholder="Enter account number" />
              </Form.Item>

              <Form.Item
                label="Account Holder Name"
                name={["bankAccountDetails", "accountHolderName"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the account holder name",
                  },
                ]}
              >
                <Input placeholder="Enter account holder name" />
              </Form.Item>

              <Form.Item
                label="Bank Name"
                name={["bankAccountDetails", "bankName"]}
                rules={[
                  { required: true, message: "Please enter the bank name" },
                ]}
              >
                <Input placeholder="Enter bank name" />
              </Form.Item>

              <Form.Item
                label="Branch Name"
                name={["bankAccountDetails", "branchName"]}
                rules={[
                  { required: true, message: "Please enter the branch name" },
                ]}
              >
                <Input placeholder="Enter branch name" />
              </Form.Item>

              <Form.Item
                label="Branch Code"
                name={["bankAccountDetails", "branchCode"]}
                rules={[
                  { required: true, message: "Please enter the branch code" },
                ]}
              >
                <Input placeholder="Enter branch code" />
              </Form.Item>
            </Form.Item>

            {/* social links */}
            <Form.Item label="Social Links">
              <Form.Item label="Facebook" name={["socialLinks", "facebook"]}>
                <Input
                  placeholder="Enter facebook account..."
                  prefix={<FacebookOutlined />}
                />
              </Form.Item>

              <Form.Item label="Instagram" name={["socialLinks", "instagram"]}>
                <Input
                  placeholder="Enter Instagram account"
                  prefix={<InstagramOutlined />}
                />
              </Form.Item>

              <Form.Item label="TikTok" name={["socialLinks", "tiktok"]}>
                <Input
                  placeholder="Enter TikTok account"
                  prefix={<TikTokOutlined />}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item labelAlign="left">
              <Space className="seller-account-setup-form-btn-container">
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
                <Button onClick={() => prev()}>Previous</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SellerForm;
