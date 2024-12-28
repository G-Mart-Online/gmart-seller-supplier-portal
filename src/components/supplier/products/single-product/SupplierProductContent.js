import { ProductFilled } from "@ant-design/icons";
import { Col, Divider, Flex, Row, Typography } from "antd";
import React from "react";
import SupplierPageContainer from "../../SupplierPageContainer";
import SingleProductMainContent from "@/components/seller/products/single-product/SingleProductMainContent";
import SupplierSingleProductMainContent from "./SupplierSingleProductMainContent";

const { Title } = Typography;

const SupplierProductContent = ({ product }) => {
  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Flex
            gap="middle"
            align="center"
            className="seller-page-title-flex"
            style={{ height: "100%" }}
          >
            <ProductFilled />
            <Title level={4} style={{ margin: 0 }}>
              {product?.productName}
            </Title>
          </Flex>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SupplierPageContainer
        childern={<SupplierSingleProductMainContent product={product} />}
      />
    </>
  );
};

export default SupplierProductContent;
