import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { SRI_LANKA_PROVINCES } from "@/constants/constants";
import { fetchProductsBySupplier } from "@/services/productService";
import { fetchSuppliers } from "@/services/supplierService";
import { formatOptions } from "@/utils/supplierUtils";
import useAuthGuard from "@/utils/useAuthGuard";
import { PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OrderSummaryModal from "./OrderSummaryModal";
import { createOrder } from "@/services/orderService";
import useNotification from "@/utils/useNotification";
import { createStyles } from "antd-style";

const { Title, Text, Paragraph } = Typography;

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  orderDetails,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
            {
              validator: (_, value) => {
                const minQuantity =
                  orderDetails.orderType === "Wholesale"
                    ? record.wholeSaleMinQuantity
                    : 1;

                if (!value || value < minQuantity) {
                  return Promise.reject(
                    new Error(
                      `Quantity must be at least ${minQuantity} for ${orderDetails.orderType} orders.`
                    )
                  );
                }

                if (value > record.stockQuantity) {
                  return Promise.reject(
                    new Error(
                      `Quantity cannot exceed available stock (${record.stockQuantity}).`
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const OrderForm = () => {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [form] = Form.useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [isSuppliersLoading, setIsSuppliersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState(null);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductOption, setSelectedProductOption] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    sellerId: user.id,
    supplierId: null,
    orderType: "Retail",
    orderItems: [],
    orderAddress: {
      address1: null,
      address2: null,
      suburb: null,
      city: null,
      postalCode: null,
      province: null,
    },
    contactNumberOne: null,
    contactNumberTwo: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderCreating, setIsOrderCreating] = useState(false);
  const [orderCreationError, setOrderCreationError] = useState(null);
  const { openNotification, contextHolder } = useNotification();

  const resetOrderDetails = () => {
    setOrderDetails({
      sellerId: user.id,
      supplierId: null,
      orderType: "Retail",
      orderItems: [],
      orderAddress: {
        address1: null,
        address2: null,
        suburb: null,
        city: null,
        postalCode: null,
        province: null,
      },
      contactNumberOne: null,
      contactNumberTwo: null,
    });

    setSelectedSupplier(null);
    form.resetFields();
  };

  const showModal = () => {
    form
      .validateFields()
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  const handleModalOk = async () => {
    try {
      setIsOrderCreating(true);
      setOrderCreationError(null);
      const modifiedOrderDetails = {
        ...orderDetails,
        ...orderDetails,
        orderItems: orderDetails.orderItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        orderType: orderDetails.orderType.toUpperCase(),
      };
      const response = await createOrder(modifiedOrderDetails);
      // openNotification(
      //   "success",
      //   "Order Placed Successfully",
      //   "Your order has been created successfully."
      // );
      if (response?.sessionUrl) {
        setTimeout(() => {
          window.location.href = response.sessionUrl;
        }, 1500);
      } else {
        setOrderCreationError(
          error.response?.data?.message || "Redirection URL not found"
        );
        console.error("Redirection URL not found");
      }
      //resetOrderDetails();
      //setIsModalOpen(false);
    } catch (error) {
      setOrderCreationError(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
      console.error("Order Error:", error);
    } finally {
      setIsOrderCreating(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const isEditing = (record) => record.key === editingKey;

  const save = async (key) => {
    try {
      const row = await form.validateFields(["quantity"]);

      setOrderDetails((prev) => {
        const updatedOrderItems = prev.orderItems.map((item) => {
          if (item.key === key) {
            const unitPrice =
              prev.orderType === "Wholesale"
                ? item.wholesalePrice
                : item.retailPrice;
            const amount = row.quantity * unitPrice;
            return { ...item, quantity: row.quantity, amount };
          }
          return item;
        });

        return { ...prev, orderItems: updatedOrderItems };
      });

      setEditingKey("");
    } catch (errInfo) {
      console.error("Validation failed while saving order items:", errInfo);
    }
  };

  const cancel = () => setEditingKey("");

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const handleDelete = (productId) => {
    setOrderDetails((prev) => ({
      ...prev,
      orderItems: prev.orderItems.filter(
        (item) => item.productId !== productId
      ),
    }));
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      width: "100",
      render: (_, record) => (
        <Flex gap="small" align="center">
          <Image
            src={record.imgUrls[0]}
            width={50}
            height={50}
            style={{ borderRadius: "12px" }}
            alt="product-img"
          />
          <Typography>{record.name}</Typography>
        </Flex>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "100",
      fixed: "left",
      editable: true,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      width: "100",
      render: (unitPrice) => `Rs. ${unitPrice.toFixed(2)}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "100",
      render: (amount) => `Rs. ${amount.toFixed(2)}`,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      fixed: "right",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Flex vertical>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </Flex>
        ) : (
          <Flex vertical>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Remove?"
              onConfirm={() => handleDelete(record.productId)}
            >
              <Typography.Link style={{ color: "red" }}>Remove</Typography.Link>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "quantity" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        orderDetails: orderDetails,
      }),
    };
  });

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
      setIsProductsLoading(true);
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
      setIsProductsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setOrderDetails((prev) => {
      if (field.startsWith("orderAddress.")) {
        const addressField = field.split(".")[1];
        return {
          ...prev,
          orderAddress: {
            ...prev.orderAddress,
            [addressField]: value,
          },
        };
      } else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  const handleAdd = () => {
    const selectedProduct = products.find(
      (product) => product.productId === selectedProductOption
    );
    if (selectedProduct) {
      const newOrderItem = {
        key: Date.now(),
        productId: selectedProduct.productId,
        name: selectedProduct.productName,
        wholeSaleMinQuantity: selectedProduct.wholeSaleMinQuantity,
        retailPrice: selectedProduct.retailPrice,
        wholesalePrice: selectedProduct.wholesalePrice,
        stockQuantity: selectedProduct.stockQuantity,
        quantity:
          orderDetails.orderType === "Wholesale"
            ? selectedProduct.wholeSaleMinQuantity
            : 1,
        unitPrice:
          orderDetails.orderType === "Wholesale"
            ? selectedProduct.wholesalePrice
            : selectedProduct.retailPrice,
        amount:
          orderDetails.orderType === "Wholesale"
            ? selectedProduct.wholesalePrice *
              selectedProduct.wholeSaleMinQuantity
            : selectedProduct.retailPrice,
        imgUrls: selectedProduct.imageUrls,
        description: selectedProduct.description,
      };

      setOrderDetails((prev) => ({
        ...prev,
        orderItems: [...prev.orderItems, newOrderItem],
      }));
    }

    setSelectedProductOption(null);
  };

  const handleOrderTypeChange = (value) => {
    setOrderDetails((prev) => ({
      ...prev,
      orderItems: [],
    }));

    form.setFieldsValue({
      orderType: value,
      orderItems: [],
    });
  };

  const getSelectedSupplierDetails = suppliers.find(
    (supplier) => supplier.id === orderDetails.supplierId
  );

  useEffect(() => {
    getSuppliersData();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      getProductsBySupplier(selectedSupplier);
    }
  }, [selectedSupplier]);

  useEffect(() => {
    if (products) {
      const updatedOptions = products.map((product) => {
        const isAlreadyInOrder = orderDetails.orderItems.some(
          (item) => item.productId === product.productId
        );

        const isDisabled =
          isAlreadyInOrder ||
          product.stockQuantity <= 1 ||
          (orderDetails.orderType === "Wholesale" &&
            product.stockQuantity < product.wholeSaleMinQuantity);

        return {
          label: product.productName,
          value: product.productId,
          disabled: isDisabled,
        };
      });

      setProductOptions(updatedOptions);
    }
  }, [products, orderDetails]);

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
    <Row gutter={[16, 16]}>
      {contextHolder}
      <Col span={24}>
        <Form
          size="large"
          layout="vertical"
          form={form}
          initialValues={{
            orderType: "Retail",
          }}
          onValuesChange={(changedValues) => {
            if (changedValues.orderType) {
              handleOrderTypeChange(changedValues.orderType);
            }
          }}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item label="Supplier" name="supplierId" required>
                <Select
                  className="seller-order-supplier-search"
                  showSearch
                  placeholder="Select a supplier"
                  optionFilterProp="label"
                  defaultOpen
                  autoFocus
                  allowClear
                  onChange={(value) => {
                    handleInputChange("supplierId", value);
                    setSelectedSupplier(value);
                    handleInputChange("orderItems", []);
                  }}
                  onClear={() => {
                    handleInputChange("supplierId", null);
                    handleInputChange("orderItems", []);
                  }}
                  options={supplierOptions}
                />
              </Form.Item>
            </Col>

            {!selectedSupplier && (
              <Col span={24}>
                <Alert
                  type="info"
                  message="No products to display. Please select a supplier to view their available products."
                  banner
                />
              </Col>
            )}
            {selectedSupplier && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item label="Order Type" name="orderType" required>
                    <Select
                      onChange={(value) => {
                        handleInputChange("orderType", value);
                        handleInputChange(value);
                      }}
                    >
                      <Select.Option value="Retail">Retail</Select.Option>
                      <Select.Option value="Wholesale">Wholesale</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    bordered
                    dataSource={orderDetails.orderItems}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    scroll={{
                      x: "max-content",
                    }}
                    title={() => (
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                          <Select
                            className="seller-order-supplier-search"
                            showSearch
                            placeholder="Select a product"
                            optionFilterProp="label"
                            autoFocus
                            allowClear
                            value={selectedProductOption}
                            onChange={(value) => {
                              setSelectedProductOption(value);
                            }}
                            onClear={() => setSelectedProductOption(null)}
                            options={productOptions}
                            loading={isProductsLoading}
                            style={{ width: "100%" }}
                          />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                            disabled={!selectedProductOption}
                          >
                            Add
                          </Button>
                        </Col>
                        {productsError && (
                          <Col
                            span={24}
                            style={{ paddingInline: 0, paddingTop: "5px" }}
                          >
                            <Alert
                              type="error"
                              message={productsError}
                              banner
                            />
                          </Col>
                        )}
                      </Row>
                    )}
                    footer={() => {
                      const totalAmount = orderDetails.orderItems.reduce(
                        (sum, item) => sum + item.amount,
                        0
                      );

                      return (
                        <Flex justify="space-between" align="center">
                          <Title level={5} style={{ margin: 0 }}>
                            Total Amount
                          </Title>
                          <Text strong>Rs. {totalAmount.toFixed(2)}</Text>
                        </Flex>
                      );
                    }}
                    expandable={{
                      expandedRowRender: (record) => (
                        <>
                          <Title level={5}>Description</Title>
                          <Paragraph type="secondary" style={{ margin: 0 }}>
                            {record.description}
                          </Paragraph>
                        </>
                      ),
                      rowExpandable: (record) => !!record.description,
                    }}
                  />
                </Col>
                <Col span={24}>
                  <Title level={5} style={{ paddingTop: "20px" }}>
                    Address
                  </Title>
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Address Line 1"
                        name={["orderAddress", "address1"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter address line 1",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter address line 1"
                          onChange={(e) =>
                            handleInputChange(
                              "orderAddress.address1",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Address Line 2"
                        name={["orderAddress", "address2"]}
                      >
                        <Input
                          placeholder="Enter address line 2"
                          onChange={(e) =>
                            handleInputChange(
                              "orderAddress.address2",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Suburb"
                        name={["orderAddress", "suburb"]}
                        rules={[
                          { required: true, message: "Please enter suburb" },
                        ]}
                      >
                        <Input
                          placeholder="Enter suburb"
                          onChange={(e) =>
                            handleInputChange(
                              "orderAddress.suburb",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="City"
                        name={["orderAddress", "city"]}
                        rules={[
                          { required: true, message: "Please enter city" },
                        ]}
                      >
                        <Input
                          placeholder="Enter city"
                          onChange={(e) =>
                            handleInputChange(
                              "orderAddress.city",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Postal Code"
                        name={["orderAddress", "postalCode"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter postal code",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter postal code"
                          onChange={(e) =>
                            handleInputChange(
                              "orderAddress.postalCode",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Province"
                        name={["orderAddress", "province"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select a province",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select a province"
                          options={SRI_LANKA_PROVINCES}
                          onChange={(value) =>
                            handleInputChange("orderAddress.province", value)
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Title level={5}>Contact</Title>
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Contact No. (1)"
                        name="contactNumberOne"
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact number 1",
                          },
                          {
                            pattern: /^[+]?[0-9]{1,15}$/,
                            message: "Please enter a valid WhatsApp number!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter contact number 1"
                          onChange={(e) =>
                            handleInputChange(
                              "contactNumberOne",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Contact No. (2)"
                        name="contactNumberTwo"
                        rules={[
                          {
                            pattern: /^[+]?[0-9]{1,15}$/,
                            message: "Please enter a valid WhatsApp number!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter contact number 2"
                          onChange={(e) =>
                            handleInputChange(
                              "contactNumberTwo",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Flex justify="flex-end">
                    <Button
                      type="primary"
                      onClick={showModal}
                      disabled={orderDetails.orderItems.length === 0}
                    >
                      Place Your Order
                    </Button>
                  </Flex>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Col>
      <OrderSummaryModal
        visible={isModalOpen}
        onCancel={handleModalCancel}
        onPlaceOrder={handleModalOk}
        orderDetails={orderDetails}
        supplier={getSelectedSupplierDetails}
        shippingCharges={123}
        confirmLoading={isOrderCreating}
        orderCreationError={orderCreationError}
      />
    </Row>
  );
};

export default OrderForm;
