import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { fetchProductsBySupplier } from "@/services/productService";
import { fetchSuppliers } from "@/services/supplierService";
import { formatOptions } from "@/utils/supplierUtils";
import { Alert, Button, Col, Flex, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import OrderProductTable from "./OrderProductTable";

const OrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isSuppliersLoading, setIsSuppliersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(null);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  const getSuppliersData = async () => {
    try {
      setIsSuppliersLoading(true);
      setError(null);
      const data = await fetchSuppliers();
      setSuppliers(data);
      setSupplierOptions(formatOptions(data, "id", "companyName"));
    } catch (error) {
      console.error("Error while fetching suppliers:", error);
      setError(error);
    } finally {
      setIsSuppliersLoading(false);
    }
  };

  const getProductsBySupplier = async (supplierId) => {
    try {
      setIsLoadingProducts(true);
      setProductsError(null);
      const data = await fetchProductsBySupplier(
        "ACTIVE",
        null,
        null,
        supplierId
      );
      if (!data || data.length === 0) {
        setProducts([]);
        setProductsError("No products found for the selected supplier.");
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error while fetching products:", error);
      setProductsError(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while fetching products. Please try again later."
      );
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const onChangeSupplier = (value) => {
    setSelectedSupplier(value);
    form.setFieldsValue({ supplierId: value });
  };

  const onClearSupplier = () => {
    setProducts([]);
    setProductsError(null);
  };

  const onFinish = (values) => {
    console.log("DataSource before submission:", dataSource);
    const {
      address1,
      address2,
      suburb,
      city,
      postalCode,
      province,
      deliveryService,
      trackingSiteUrl,
      description,
      contactNumberOne,
      contactNumberTwo,
      trackingId,
      orderType,
    } = values;

    if (dataSource.length === 0) {
      form.setFields([
        {
          name: "products",
          errors: ["At least one product is required to place an order."],
        },
      ]);
      return;
    }

    const orderItems = dataSource.map((row) => {
      if (!row.quantity || row.quantity < 1) {
        console.error("Invalid quantity for product:", row);
        form.setFields([
          {
            name: "products",
            errors: ["All products must have a quantity of at least 1."],
          },
        ]);
        return null;
      }
      return {
        productId: row.productId,
        quantity: row.quantity,
      };
    });

    if (orderItems.includes(null)) {
      return;
    }

    const requestBody = {
      sellerId: "seller-123", // Example seller ID
      supplierId: selectedSupplier,
      orderItems,
      orderType,
      orderAddress: {
        address1,
        address2,
        suburb,
        city,
        postalCode,
        province,
      },
      deliveryType: {
        deliveryService,
        trackingSiteUrl,
        description,
      },
      contactNumberOne,
      contactNumberTwo,
      trackingId,
    };

    console.log("Request Body:", requestBody);

    form.resetFields();
    setDataSource([]);
    setCount(0);
    setSelectedSupplier(null);
  };

  useEffect(() => {
    getSuppliersData();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      getProductsBySupplier(selectedSupplier);
    }
  }, [selectedSupplier]);

  if (isSuppliersLoading) {
    return <CustomSpin />;
  }

  if (error) {
    return (
      <ErrorAlert
        message="Error"
        description={
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "An unexpected error occurred. Please try again later."
        }
      />
    );
  }

  if (suppliers.length === 0) {
    return <EmptyScreen message="Suppliers not found" />;
  }

  return (
    <Form
      name="order-form"
      form={form}
      labelCol={{
        flex: "160px",
      }}
      labelAlign="left"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      style={{ width: "100%" }}
      size="middle"
      onFinish={onFinish}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="supplierId"
            label="Supplier"
            rules={[
              {
                required: true,
                message: "Selecting a supplier is required to proceed.",
              },
            ]}
          >
            <Select
              className="seller-order-supplier-search"
              showSearch
              placeholder="Select a supplier"
              optionFilterProp="label"
              defaultOpen
              autoFocus
              allowClear
              onChange={onChangeSupplier}
              onClear={onClearSupplier}
              options={supplierOptions}
            />
          </Form.Item>
        </Col>

        {!selectedSupplier && (
          <Col span={24}>
            <EmptyScreen message="No products to display. Please select a supplier to view their available products." />
          </Col>
        )}
        {isLoadingProducts && (
          <Col span={24}>
            <CustomSpin />
          </Col>
        )}
        {productsError && (
          <Col span={24}>
            <Alert message={productsError} type="error" showIcon banner />
          </Col>
        )}
        {selectedSupplier && products?.length > 0 && (
          <>
            <Col span={24}>
              <Alert
                message="Products successfully loaded! Browse the available items below."
                type="success"
                showIcon
                banner
                closable
              />
            </Col>
            <OrderProductTable
              form={form}
              products={products}
              dataSource={dataSource}
              setDataSource={setDataSource}
              count={count}
              setCount={setCount}
            />

            <Col span={8}>
              <Form.Item
                name="address1"
                label="Address 1"
                rules={[{ required: true, message: "Address 1 is required" }]}
              >
                <Input placeholder="Enter Address Line 1" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="address2" label="Address 2">
                <Input placeholder="Enter Address Line 2" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="suburb"
                label="Suburb"
                rules={[{ required: true, message: "Suburb is required" }]}
              >
                <Input placeholder="Enter Suburb" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "City is required" }]}
              >
                <Input placeholder="Enter City" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={[{ required: true, message: "Postal Code is required" }]}
              >
                <Input placeholder="Enter Postal Code" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="province"
                label="Province"
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Input placeholder="Enter Province" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="contactNumberOne"
                label="Primary Contact Number"
                rules={[
                  { required: true, message: "Contact number is required" },
                ]}
              >
                <Input placeholder="Enter Primary Contact Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contactNumberTwo"
                label="Secondary Contact Number"
              >
                <Input placeholder="Enter Secondary Contact Number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="trackingSiteUrl" label="Tracking URL">
                <Input placeholder="Enter Tracking Site URL" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="trackingId" label="Tracking ID">
                <Input placeholder="Enter Tracking ID" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Flex gap="small">
                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    disabled={dataSource.length === 0}
                    onClick={onFinish}
                  >
                    Place Your Order
                  </Button>
                </Form.Item>
              </Flex>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default OrderForm;
