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

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const sellerData = {
        whatsappNumber: values.whatsappNumber,
        bankAccount: values.bankAccount,
        socialMediaLinks: values.socialMediaLinks,
      };

      formData.append("seller", JSON.stringify(sellerData));

      if (values.nicImage?.[0]?.originFileObj) {
        formData.append("nicImage", values.nicImage[0].originFileObj);
      } else {
        openNotification("error", "Error", "Please upload your NIC image.");
        setIsLoading(false);
        return;
      }

      const response = await createSellerAccount(userId, formData);
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
              name="nicImage"
              label="Upload Your ID Card"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
              extra="Please upload a clear and high-quality image of your ID card (e.g., license, passport, or other identification). Accepted formats: JPG, PNG."
              rules={[
                {
                  required: true,
                  message: "ID card image is required!",
                },
                {
                  validator: (_, value) => {
                    const file = value[0]?.originFileObj;

                    if (file) {
                      const isImage =
                        file.type === "image/jpeg" ||
                        file.type === "image/png" ||
                        file.type === "image/jpg";
                      if (!isImage) {
                        return Promise.reject(
                          "You can only upload JPG or PNG image files!"
                        );
                      }

                      const isLt2M = file.size / 1024 / 1024 < 2;
                      if (!isLt2M) {
                        return Promise.reject(
                          "Image must be smaller than 2MB!"
                        );
                      }
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                showUploadList={{ showPreviewIcon: false }}
                onPreview={(file) => {
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            {/* Bank Account Details */}
            <Form.Item label="Bank Account Details">
              <Form.Item
                label="Account Number"
                name={["bankAccount", "accountNumber"]}
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
                name={["bankAccount", "accountHolderName"]}
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
                name={["bankAccount", "bankName"]}
                rules={[
                  { required: true, message: "Please enter the bank name" },
                ]}
              >
                <Input placeholder="Enter bank name" />
              </Form.Item>

              <Form.Item
                label="Branch Name"
                name={["bankAccount", "branchName"]}
                rules={[
                  { required: true, message: "Please enter the branch name" },
                ]}
              >
                <Input placeholder="Enter branch name" />
              </Form.Item>

              <Form.Item
                label="Branch Code"
                name={["bankAccount", "branchCode"]}
                rules={[
                  { required: true, message: "Please enter the branch code" },
                ]}
              >
                <Input placeholder="Enter branch code" />
              </Form.Item>
            </Form.Item>

            {/* social links */}
            <Form.Item label="Social Links">
              <Form.Item label="Facebook" name={["socialMediaLinks", "fb"]}>
                <Input
                  placeholder="Enter facebook account..."
                  prefix={<FacebookOutlined />}
                />
              </Form.Item>

              <Form.Item
                label="Instagram"
                name={["socialMediaLinks", "instagram"]}
              >
                <Input
                  placeholder="Enter Instagram account"
                  prefix={<InstagramOutlined />}
                />
              </Form.Item>

              <Form.Item label="TikTok" name={["socialMediaLinks", "tiktok"]}>
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
