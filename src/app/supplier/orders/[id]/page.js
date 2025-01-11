"use client";

import CustomSpin from "@/components/common/CustomSpin";
import ErrorAlert from "@/components/common/ErrorAlert";
import SupplierOrderContent from "@/components/supplier/orders/single-order/SupplierOrderContent";
import { fetchOrderById, updateOrderStatus } from "@/services/orderService";
import useNotification from "@/utils/useNotification";
import React, { useEffect, useState } from "react";

const SingleOrderPage = ({ params }) => {
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const { openNotification, contextHolder } = useNotification();
  const [isUpdating, setIsUpdating] = useState(false);
  const [openPopconfirm, setOpenPopconfirm] = useState(false);

  const allowedTransitions = {
    CREATED: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["SHIPPED"],
    SHIPPED: [],
    CANCELLED: [],
  };

  const getStatusOptions = () => {
    const validTransitions = allowedTransitions[order?.orderStatus] || [];
    return [
      {
        label: <span>seller</span>,
        title: "seller",
        options: [
          {
            value: "CREATED",
            label: "Created",
            disabled: !validTransitions.includes("CREATED"),
          },
        ],
      },
      {
        label: <span>supplier</span>,
        title: "supplier",
        options: [
          {
            value: "CONFIRMED",
            label: "Confirmed",
            disabled: !validTransitions.includes("CONFIRMED"),
          },
          {
            value: "SHIPPED",
            label: "Shipped",
            disabled: !validTransitions.includes("SHIPPED"),
          },
        ],
      },
      {
        label: <span>admin</span>,
        title: "admin",
        options: [{ value: "DELIVERED", label: "Delivered", disabled: true }],
      },
      {
        label: <span>all</span>,
        title: "all",
        options: [
          {
            value: "CANCELLED",
            label: "Cancelled",
            disabled: !validTransitions.includes("CANCELLED"),
          },
        ],
      },
    ];
  };

  const getConfirmationMessage = (currentStatus, selectedStatus) => {
    if (currentStatus === "CREATED" && selectedStatus === "CONFIRMED") {
      return "Are you sure you want to confirm this order? This action is irreversible.";
    }
    if (currentStatus === "CREATED" && selectedStatus === "CANCELLED") {
      return "Are you sure you want to cancel this order? This action cannot be undone.";
    }
    if (currentStatus === "CONFIRMED" && selectedStatus === "SHIPPED") {
      return "Are you sure you want to mark this order as shipped? This action cannot be undone.";
    }
    return "This action is not allowed.";
  };

  const getOrderById = async (orderId) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchOrderById(orderId);
      setOrder(data);
      setStatus(data.orderStatus);
    } catch (error) {
      console.error("Error while fetching order:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      setIsUpdating(true);
      const data = await updateOrderStatus(id, status);
      setOrder(data);
      setStatus(data.orderStatus);
      openNotification("success", "Order status updated successfully");
    } catch (error) {
      console.error("Error occurred while updating order status", error);
      openNotification(
        "error",
        "Failed to update order status",
        error.message || ""
      );
    } finally {
      setIsUpdating(false);
      setOpenPopconfirm(false);
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

  return (
    <>
      {contextHolder}
      <SupplierOrderContent
        order={order}
        status={status}
        setStatus={setStatus}
        getStatusOptions={getStatusOptions}
        handleStatusChange={handleStatusChange}
        allowedTransitions={allowedTransitions}
        isUpdating={isUpdating}
        getConfirmationMessage={getConfirmationMessage}
        openPopconfirm={openPopconfirm}
        setOpenPopconfirm={setOpenPopconfirm}
      />
    </>
  );
};

export default SingleOrderPage;
