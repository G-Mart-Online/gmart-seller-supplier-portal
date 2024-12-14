import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { fetchSuppliers } from "@/services/supplierService";
import { formatOptions } from "@/utils/supplierUtils";
import { Col, Flex, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const OrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isSuppliersLoading, setIsSuppliersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

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

  const getProductsBySupplier = async () => {
    try {
      setIsLoadingProducts(true);
    } catch (error) {
      
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const onChange = (value) => {
    setSelectedSupplier(value);
  };

  useEffect(() => {
    getSuppliersData();
  }, []);

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
      <Form
        name="wrap"
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
        size="large"
      >
        <Col span={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="supplierId"
              label="Supplier"
              rules={[
                {
                  required: true,
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
                onChange={onChange}
                options={supplierOptions}
              />
            </Form.Item>
          </Col>
          {!selectedSupplier && (
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ height: "100#%" }}
            >
              <EmptyScreen message="No products to display. Please select a supplier to view their available products." />
            </Col>
          )}
          {isLoadingProducts && (
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ height: "100#%" }}
            >
              <Flex>
                <CustomSpin />
              </Flex>
            </Col>
          )}
        </Col>
      </Form>
    </Row>
  );
};

export default OrderForm;
