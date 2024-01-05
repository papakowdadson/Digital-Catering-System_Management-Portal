import React, { useEffect, useState } from "react";
import { Pagination, Table, Button, Tag } from "rsuite";
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import IconButton from "rsuite/IconButton";

import "rsuite/dist/rsuite-no-reset.min.css";

const { Column, HeaderCell, Cell } = Table;

const rowKey = "_id";
const ExpandCell = ({
  rowData,
  dataKey,
  expandedRowKeys,
  onChange,
  ...props
}) => (
  <Cell {...props} style={{ padding: 5 }}>
    <IconButton
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some((key) => key === rowData[rowKey]) ? (
          <CollaspedOutlineIcon />
        ) : (
          <ExpandOutlineIcon />
        )
      }
    />
  </Cell>
);

const renderRowExpanded = (rowData) => {
  return (
    <div className="overflow-y-scroll" style={{
      height:120
    }}>
      {rowData.products.map((product,index) => (
        <div className="mb-4" key={index}>
          <div
            style={{
              width: 60,
              height: 60,
              float: "left",
              marginRight: 10,
              background: "#eee",
            }}
          >
            <img src={product.productImageUrl} style={{ width: 60 }} />
          </div>
          <p>Product Name: {product.productName}</p>
          <p>Quantity: {product.quantity}</p>
          
        </div>
      ))}
    </div>
  );
};

export default function CustomOrdersTable({
  data,
  myFunction,
  loading,
  actionText,
}) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const newData = data.filter((_, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };

  const ButtonCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
      <Button
        onClick={() =>rowData['Status']==='pending'?myFunction(rowData[dataKey]):null}
        appearance={rowData['Status']==='pending'?"primary":'default'}
      >
        {rowData['Status']==='pending'?actionText:'Accepted'}
      </Button>
    </Cell>
  );

  return (
    <div className=" mt-2">
      <Table
        autoHeight
        data={newData}
        virtualized
        loading={loading}
        rowKey={rowKey}
        expandedRowKeys={expandedRowKeys}
        rowExpandedHeight={120}
        onRowClick={(data) => {
          console.log(data);
        }}
        renderRowExpanded={renderRowExpanded}
      >
        <Column width={50} align="center"fullText={true} fixed>
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="_id"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Column>


        <Column minWidth={250} flexGrow={2} align="left" fullText={true}>
          <HeaderCell>Owner</HeaderCell>
          <Cell dataKey="userId" />
        </Column>

        <Column minWidth={90} flexGrow={2} align="left" fullText={true}>
          <HeaderCell>Location</HeaderCell>
          <Cell dataKey="address.city" />
        </Column>

        <Column minWidth={80} flexGrow={1}  align="left" fullText={true}>
          <HeaderCell>Amount(GHS)</HeaderCell>
          <Cell dataKey="amount" />
        </Column> 



        <Column minWidth={80} flexGrow={1} align="left" fullText={true}>
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="Status" />
        </Column>

        <Column width={90} align="left" fixed="right">
          <HeaderCell>Action</HeaderCell>
          <ButtonCell dataKey="_id" rowData={newData} />
        </Column>
      </Table>
      <div style={{ padding: 20, width: "100%" }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[20, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
}
