"use client";
import { Input } from "antd";
import React from "react";

const { Search } = Input;

const SearchBar = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <Search placeholder="Search Products" onSearch={onSearch} enterButton />
  );
};

export default SearchBar;
