"use client";

import SellerProductListContent from "@/components/seller/products/SellerProductListContent";
import SellerPageContainer from "@/components/seller/SellerPageContainer";
import SellerPageTitle from "@/components/seller/SellerPageTitle";
import { fetchProductCategories } from "@/services/productCategoryService";
import {
  fetchProducts,
  fetchProductSearchResults,
} from "@/services/productService";
import {
  LoadingOutlined,
  ProductFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Divider, Flex, Row, Select, Spin } from "antd";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isCategoryFilterDissable, setIsCategoryFilterDissable] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [serachOptions, setSearchOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const fetchCategoryList = async () => {
    try {
      setIsCategoriesLoading(true);
      setIsCategoryFilterDissable(false);
      const data = await fetchProductCategories();
      setCategories(data);
    } catch (error) {
      setIsCategoryFilterDissable(true);
      console.error("Error while fetching categories", error);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const fetchProductsList = async (
    page = currentPage,
    size = pageSize,
    category = selectedCategory?.categoryId
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProducts("ACTIVE", page, size, category);
      setProducts(data?.content || data);
      setTotalItems(data.totalElements);
      setCurrentPage(page);
      setPageSize(size);
    } catch (error) {
      console.error("Error while fetching products:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) return;
      setIsSearching(true);
      try {
        const data = await fetchProductSearchResults(searchTerm);
        setSearchOptions(data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  const handleCategoryChange = (value) => {
    const selectedCategoryObject = categories.find(
      (category) => category.categoryId === value
    );
    setSelectedCategory(selectedCategoryObject);
    fetchProductsList(0, pageSize, value);
    setCurrentPage(0);
  };

  const handleSearch = (value) => {
    debouncedFetch(value);
  };

  const handleSearchOptionSelect = (value) => {
    router.push(`products/${value}`);
  };

  const handlePageChange = (page, size) => {
    fetchProductsList(page, size);
  };

  useEffect(() => {
    fetchProductsList();
    fetchCategoryList();
  }, []);

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <SellerPageTitle icon={<ProductFilled />} pageTitle="Products" />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <Select
            onChange={handleCategoryChange}
            style={{ width: "100%" }}
            options={categories?.map((category) => ({
              value: category?.categoryId,
              label: category?.categoryName,
            }))}
            placeholder="Select a Category"
            allowClear
            size="large"
            loading={isCategoriesLoading}
            disabled={isCategoryFilterDissable}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <Select
            showSearch
            placeholder="Search Products"
            style={{ width: "100%" }}
            size="large"
            suffixIcon={<SearchOutlined />}
            filterOption={false}
            onSearch={handleSearch}
            onSelect={handleSearchOptionSelect}
            options={(serachOptions || []).map((result) => ({
              value: result.productId,
              label: result.productName,
            }))}
            notFoundContent={
              isSearching ? (
                <Flex justify="center" align="center">
                  <Spin size="small" indicator={<LoadingOutlined spin />} />
                </Flex>
              ) : (
                <Flex justify="center" align="center">
                  No results found
                </Flex>
              )
            }
          />
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SellerPageContainer
        childern={
          <SellerProductListContent
            isLoading={isLoading}
            products={products}
            error={error}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            selectedCategory={selectedCategory}
          />
        }
      />
    </>
  );
};

export default ProductPage;
