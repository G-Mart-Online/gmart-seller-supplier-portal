import { createSupplierAccount } from "@/services/supplierService";
import useAuthGuard from "@/utils/useAuthGuard";
import useNotification from "@/utils/useNotification";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography, Upload } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

const SupplierForm = ({ next, prev, userId }) => {
  const { mutate } = useAuthGuard({ middleware: "auth" });
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification, contextHolder } = useNotification();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const supplierData = {
        companyName: values.companyName,
        contactPersonName: values.contactPersonName,
        contactPhone: values.contactPhone,
        contactEmail: values.contactEmail,
        bankAccountDetails: values.bankAccountDetails,
        supplierAddress: values.supplierAddress,
      };

      formData.append("supplier", JSON.stringify(supplierData));

      if (values.nicImage?.[0]?.originFileObj) {
        formData.append("nicImage", values.nicImage[0].originFileObj);
      } else {
        openNotification("error", "Error", "Please upload your NIC image.");
        setIsLoading(false);
        return;
      }

      const response = await createSupplierAccount(userId, formData);
      mutate();
    } catch (error) {
      openNotification(
        "error",
        "Error",
        "An unexpected error occurred while processing your request. Please try again later."
      );
      console.error("Error occurred while creating supplier account", error);
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
          <Title level={5}>Tell us more about your supply business!</Title>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form
            name="seller-account-setup"
            className="seller-account-setup-form "
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
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
                rules={[
                  { required: true, message: "Please enter postal code" },
                ]}
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

export default SupplierForm;
