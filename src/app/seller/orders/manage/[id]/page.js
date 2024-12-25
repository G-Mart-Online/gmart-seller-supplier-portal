"use client";

import CustomSpin from "@/components/common/CustomSpin";
import ErrorAlert from "@/components/common/ErrorAlert";
import { fetchOrderById } from "@/services/orderService";
import React, { useEffect, useState } from "react";

const OrderPage = ({ params }) => {
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrderById = async (orderId) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Error while fetching order:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getOrderById(id);
    }
  }, [id]);

  if (isLoading) {
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

  return <div>OrderPage</div>;
};

export default OrderPage;
