import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography, Upload } from "antd";
import React from "react";

const { Title } = Typography;

const SellerForm = () => {
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
    <Row className="account-setup-main-row" gutter={[16, 16]} justify="start">
      <Col span={24}>
        <Title className="account-setup-title" level={5}>
          Tell us more about your selling details!
        </Title>
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
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "description is required!",
              },
            ]}
          >
            <Input placeholder="input placeholder" />
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

export default SellerForm;
