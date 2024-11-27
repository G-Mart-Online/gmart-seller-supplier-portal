import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography, Upload } from "antd";
import React from "react";

const { Title } = Typography;

const SupplierForm = ({ next, prev }) => {
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Row className="account-setup-main-row" gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Title level={5}>Tell us more about your supply business!</Title>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Form
          name="seller-account-setup"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className="seller-account-setup-form "
        >
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[
              {
                required: true,
                message: "company name is required!",
              },
            ]}
          >
            <Input placeholder="Ex. ABC Company" />
          </Form.Item>
          <Form.Item
            name="contactPersonName"
            label="Contact Person Name"
            rules={[
              {
                required: true,
                message: "contact person name is required!",
              },
            ]}
          >
            <Input placeholder="Ex. Jhon Deo" />
          </Form.Item>
          <Form.Item
            name="contactPhone"
            label="Contact No"
            rules={[
              {
                required: true,
                message: "contact number is required!",
              },
            ]}
          >
            <Input placeholder="Ex. 0112-000-000" />
          </Form.Item>
          <Form.Item
            name="contactEmail"
            label="Contact Email"
            rules={[
              {
                required: true,
                message: "contact email is required!",
              },
            ]}
          >
            <Input placeholder="Ex. company@domain.com" />
          </Form.Item>

          <Form.Item
            name="id-image"
            label="Upload Your ID Card"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Please upload a clear and high-quality image of your ID card (e.g., license, passport, or other identification). Accepted formats: JPG, PNG."
            rules={[
              {
                required: true,
                message: "id is required!",
              },
            ]}
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
                { required: true, message: "Please enter the account number" },
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

          {/* Supplier Address */}
          <Form.Item label="Store Address">
            <Form.Item
              label="Address Line 1"
              name={["supplierAddress", "address1"]}
              rules={[
                { required: true, message: "Please enter address line 1" },
              ]}
            >
              <Input placeholder="Enter address line 1" />
            </Form.Item>

            <Form.Item
              label="Address Line 2"
              name={["supplierAddress", "address2"]}
              rules={[
                { required: true, message: "Please enter address line 2" },
              ]}
            >
              <Input placeholder="Enter address line 2" />
            </Form.Item>

            <Form.Item
              label="Suburb"
              name={["supplierAddress", "suburb"]}
              rules={[{ required: true, message: "Please enter suburb" }]}
            >
              <Input placeholder="Enter suburb" />
            </Form.Item>

            <Form.Item
              label="City"
              name={["supplierAddress", "city"]}
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>

            <Form.Item
              label="Postal Code"
              name={["supplierAddress", "postalCode"]}
              rules={[{ required: true, message: "Please enter postal code" }]}
            >
              <Input placeholder="Enter postal code" />
            </Form.Item>

            <Form.Item
              label="Province"
              name={["supplierAddress", "province"]}
              rules={[{ required: true, message: "Please enter province" }]}
            >
              <Input placeholder="Enter province" />
            </Form.Item>
          </Form.Item>

          {/* social links */}
          <Form.Item label="Social Links">
            <Form.Item label="Facebook" name={["socialLinks", "facebook"]}>
              <Input
                placeholder="Enter Facebook account..."
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SupplierForm;
