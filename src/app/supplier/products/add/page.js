"use client";
import {
  Form,
  Upload,
  Input,
  Select,
  Typography,
  Image,
  Button,
  message,
  Row,
  Col,
  Divider,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { InboxOutlined, PlusOutlined, ProductFilled } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from ".././../../../utils/firebaseConfig.js";
import SupplierPageTitle from "@/components/supplier/SupplierPageTitle.js";
import SellerPageContainer from "@/components/seller/SellerPageContainer.js";
import useAuthGuard from "@/utils/useAuthGuard.js";
import { AddNewProduct } from "@/services/productService.js";
import { fetchProductCategories } from "@/services/productCategoryService.js";

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
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { user } = useAuthGuard({ middleware: "auth" });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 6) {
      message.error("You can only upload up to 6 images!");
    } else {
      setFileList(newFileList);
    }
  };

  const handleVideoUpload = async () => {
    setUploading(true);
    try {
      const videoRef = ref(storage, `product-videos/${videoFile.name}`);
      const uploadTask = uploadBytesResumable(videoRef, videoFile);

      const downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            message.error(`Video upload failed: ${error.message}`);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });

      message.success("Video uploaded successfully!");
      return downloadURL;
    } catch (error) {
      message.error("Failed to upload the video.");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (fileList.length !== 2) {
      message.error("Please upload exactly 2 images!");
      return;
    }

    const uploadPromises = fileList.map((file) => {
      const storageRef = ref(storage, `product-images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            message.error(`Image upload failed: ${error.message}`);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
    });

    try {
      const urls = await Promise.all(uploadPromises);
      message.success("All images uploaded successfully!");
      return urls;
    } catch (error) {
      message.error("Failed to upload images.");
      throw error;
    }
  };

  const onFinish = async (values) => {
    try {
      const imageUrls = await handleUpload();
      const videoUrl = await handleVideoUpload();

      if (imageUrls.length === 0) {
        message.error("Please upload at least one image.");
        return;
      }

      const seoTagsArray = values.seoTags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      if (!seoTagsArray || seoTagsArray.length === 0) {
        message.error(
          "Please provide valid SEO tags as comma-separated values."
        );
        return;
      }

      const productData = {
        productName: values.productName,
        description: values.description,
        stockQuantity: values.stockQuantity,
        wholesalePrice: values.WholePrice,
        retailPrice: values.RetailPrice,
        seoTags: seoTagsArray,
        imageUrls: imageUrls,
        videoUrl: videoUrl,
        supplier: user?.id,
        category: values.productCategory,
      };

      console.log("pridct data", productData);
      await AddNewProduct(productData);

      message.success("Product added successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      message.error(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await fetchProductCategories();
      setCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log("this is user", user);

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

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <SupplierPageTitle icon={<ProductFilled />} pageTitle="Products" />
        </Col>

        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer
        childern={
          <Row gutter={[16, 16]} justify="start">
            <Col span={24}>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                style={{ maxWidth: 1000 }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Product Name"
                  name="productName"
                  rules={[
                    { required: true, message: "Please input product name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please fill description!" },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                  label="Stock Quantity"
                  name="stockQuantity"
                  rules={[
                    { required: true, message: "Please input stock quantity!" },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(
                            new Error("Stock quantity is required.")
                          );
                        }
                        if (!/^\d+$/.test(value)) {
                          return Promise.reject(
                            new Error("Stock quantity must be a valid integer.")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Whole Sale Price"
                  name="WholePrice"
                  rules={[
                    { required: true, message: "Please input price!" },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(
                            new Error("Wholesale price is required.")
                          );
                        }
                        if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                          return Promise.reject(
                            new Error(
                              "Wholesale price must be a valid float (e.g., 100.00, 999.99)."
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Retail Price"
                  name="RetailPrice"
                  rules={[
                    { required: true, message: "Please input retail price!" },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(
                            new Error("Retail price is required.")
                          );
                        }
                        if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                          return Promise.reject(
                            new Error(
                              "Retail price must be a valid float (e.g., 100.00, 999.99)."
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Product Category"
                  name="productCategory"
                  rules={[
                    { required: true, message: "Please select category!" },
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
                    options={categories.map((category) => ({
                      value: category.categoryId, // categoryId as value
                      label: category.categoryName, // categoryName as label
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label="SEO Tags"
                  name="seoTags"
                  rules={[
                    { required: true },
                    {
                      validator: (_, value) => {
                        if (!value || value.trim() === "") {
                          return Promise.reject(
                            new Error("SEO tags cannot be empty.")
                          );
                        }

                        const seoTagsArray = value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag !== "");

                        if (seoTagsArray.length === 0) {
                          return Promise.reject(
                            new Error("Please provide at least one valid tag.")
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Add SEO tags as comma-separated values. eg: tag1, tag2, tag3"
                  />
                </Form.Item>
                <Form.Item label="Product Images" name="images">
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      value={fileList}
                      onPreview={handlePreview}
                      onChange={handleImageChange}
                      beforeUpload={(file) => {
                        const isJpgOrJpeg =
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg" ||
                          file.type === "image/png";
                        const isLt2M = file.size / 1024 / 1024 < 2;

                        if (!isJpgOrJpeg) {
                          message.error(
                            "Only JPG/JPEG/PNG images are allowed!"
                          );
                          return Upload.LIST_IGNORE;
                        }

                        if (!isLt2M) {
                          message.error("Image must be smaller than 2MB!");
                          return Upload.LIST_IGNORE;
                        }

                        return true;
                      }}
                    >
                      {fileList.length < 6 ? uploadButton : null}
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{ display: "none" }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                        }}
                        alt="gmart.com"
                        src={previewImage}
                      />
                    )}
                  </div>
                </Form.Item>

                <Form.Item label="Product Video" name="video">
                  <Upload.Dragger
                    name="file"
                    beforeUpload={(file) => {
                      const isMp4 = file.type === "video/mp4";
                      if (!isMp4) {
                        message.error("You can only upload MP4 files!");
                        return Upload.LIST_IGNORE;
                      }
                      const isLt20MB = file.size / 1024 / 1024 < 20;
                      if (!isLt20MB) {
                        message.error("Video must be smaller than 20MB!");
                        return Upload.LIST_IGNORE;
                      }
                      setVideoFile(file);
                      return false;
                    }}
                    maxCount={1}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag video file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
                <Form.Item
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={uploading}
                    style={{ width: 150 }}
                  >
                    {uploading ? "Uploading..." : "Add Product"}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        }
      />
    </>
  );
};

export default AddProduct;
