"use client";

import CustomSpin from "@/components/common/CustomSpin";
import ErrorAlert from "@/components/common/ErrorAlert";
import SellerProductContent from "@/components/seller/products/SellerProductContent";
import React, { useState } from "react";

const SingleProductPage = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return <SellerProductContent product={product} />;
};

export default SingleProductPage;
