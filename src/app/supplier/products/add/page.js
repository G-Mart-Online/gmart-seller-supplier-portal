"use client";
import {
  Form,
  Upload,
  Input,
  Select,
  Typography,
  Image,
  Button,
  Grid,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProduct = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { xs, sm, md, lg } = Grid.useBreakpoint();
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onFinish = (values) => {
    if (fileList.length !== 1) {
      message.error("Please upload exactly 6 images!");
      return;
    }

    // Prepare form data for submission
    const images = fileList.map((file) =>
      file.url ? file.url : file.response?.url
    ); // Assuming `url` comes from the upload server

    const formData = {
      ...values,
      images,
    };
    console.log("Success");
    console.log("Form submitted:", values);

    // API call or further processing here
  };

  return (
    <div>
      <Title level={2}>Add New Product</Title>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1000,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please fill description!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Stock Quantity"
          name="stockQuantity"
          rules={[
            {
              required: true,
              message: "Please input stock quantity!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Wholesale Price"
          name="wholesalePrice"
          rules={[
            {
              required: true,
              message: "Please input wholesale price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Retail Price"
          name="retailPrice"
          rules={[
            {
              required: true,
              message: "Please input retail price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="productCategory"
          rules={[
            {
              required: true,
              message: "Please select category!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Electric",
              },
              {
                value: "3",
                label: "HouseHold",
              },
              {
                value: "4",
                label: "Clothing",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Product Images"
          name="images"
          rules={[
            {
              required: true,
              message: "Please add images!",
            },
          ]}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              alt="gmart.com"
              src={previewImage}
            />
          )}
        </Form.Item>
        <Form.Item
          label={null}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
