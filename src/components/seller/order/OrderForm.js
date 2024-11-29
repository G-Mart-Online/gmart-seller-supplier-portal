import CustomSpin from "@/components/common/CustomSpin";
import EmptyScreen from "@/components/common/EmptyScreen";
import ErrorAlert from "@/components/common/ErrorAlert";
import { fetchSuppliers } from "@/services/supplierService";
import { Flex, Select } from "antd";
import React, { useEffect, useState } from "react";

const OrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isSuppliersLoading, setIsSuppliersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const getSuppliersData = async () => {
    try {
      setIsSuppliersLoading(true);
      setError(null);
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error("Error while fetching suppliers:", error);
      setError(error);
    } finally {
      setIsSuppliersLoading(false);
    }
  };

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
      <Flex>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </Flex>
    </>
  );
};

export default OrderForm;
