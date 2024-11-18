"use client";

import CustomSpin from "@/components/common/CustomSpin";
import ErrorAlert from "@/components/common/ErrorAlert";
import SellerProductContent from "@/components/seller/products/SellerProductContent";
import { fetchProductById } from "@/services/productService";

import React, { useEffect, useState } from "react";

const SingleProductPage = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async (productId) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error("Error while fetching products:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
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

  return <SellerProductContent product={product} />;
};

export default SingleProductPage;
