import {
  Button,
  Col,
  Divider,
  Flex,
  Popconfirm,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
import SupplierPageContainer from "../../SupplierPageContainer";
import { ProductFilled } from "@ant-design/icons";
import SupplierOrderDetails from "./SupplierOrderDetails";

const { Title } = Typography;

const SupplierOrderContent = ({
  order,
  status,
  setStatus,
  getStatusOptions,
  handleStatusChange,
  allowedTransitions,
  isUpdating,
  getConfirmationMessage,
  openPopconfirm,
  setOpenPopconfirm,
}) => {
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
              {order?.orderNumber}
            </Title>
          </Flex>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Flex gap="small" justify="flex-end" align="center">
            <Select
              value={status}
              onChange={setStatus}
              options={getStatusOptions()}
              style={{ width: 200 }}
              listHeight={400}
            />
            <Popconfirm
              title="Update Status"
              description={getConfirmationMessage(order?.orderStatus, status)}
              okText="Yes"
              cancelText="No"
              open={openPopconfirm}
              onConfirm={handleStatusChange}
              okButtonProps={{ loading: isUpdating }}
              onCancel={() => setOpenPopconfirm(false)}
            >
              <Button
                type="primary"
                onClick={() => setOpenPopconfirm(true)}
                disabled={
                  !allowedTransitions[order?.orderStatus]?.includes(status)
                }
              >
                Update
              </Button>
            </Popconfirm>
          </Flex>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <SupplierPageContainer
        childern={<SupplierOrderDetails order={order} />}
      />
    </>
  );
};

export default SupplierOrderContent;
