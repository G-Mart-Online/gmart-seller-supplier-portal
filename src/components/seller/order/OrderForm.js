import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { fetchSuppliers } from "@/services/supplierService";
import { formatOptions } from "@/utils/supplierUtils";
import { Col, Flex, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const OrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isSuppliersLoading, setIsSuppliersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState([]);

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

  console.log("options::", supplierOptions);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
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
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Flex>
              <Select
                showSearch
                placeholder="Search a supplier"
                optionFilterProp="label"
                defaultOpen
                autoFocus
                allowClear
                onChange={onChange}
                onSearch={onSearch}
                options={supplierOptions}
                style={{ width: "100%" }}
                size="large"
              />
            </Flex>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default OrderForm;
