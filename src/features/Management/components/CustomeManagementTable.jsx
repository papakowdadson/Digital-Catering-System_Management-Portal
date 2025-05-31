import React, { useState, useEffect } from "react";
import { Pagination, Table, Button, Tag, Input } from "rsuite";

import "rsuite/dist/rsuite-no-reset.min.css";

const { Column, HeaderCell, Cell } = Table;

const rowKey = "_id";

export default function CustomManagementTable({
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

  const ButtonCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
      <Button onClick={() => myFunction(rowData[dataKey])} appearance="primary">
        {actionText}
      </Button>
    </Cell>
  );

  const InputCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <Input id={dataKey} disabled value={rowData[dataKey]} />
      </Cell>
    );
  };

  return (
    <div className=" mt-2 mx-auto w-full max-w-6xl border rounded-lg p-2">
      <Table
        autoHeight
        data={newData}
        loading={loading}
        rowKey={rowKey}
        onRowClick={(data) => {
          console.log(data);
        }}
      >
        <Column minWidth={150} flexGrow={2} align="left" fullText={true} fixed>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column minWidth={90} flexGrow={2} align="left" fullText={true}>
          <HeaderCell>Description</HeaderCell>
          <Cell dataKey="desc" />
        </Column>

        <Column width={100} align="left" fullText={true}>
          <HeaderCell>Price (GHS)</HeaderCell>
          <InputCell dataKey="price" rowData={newData} />
        </Column>

        <Column minWidth={300} flexGrow={3} align="left" fullText={true}>
          <HeaderCell>Image</HeaderCell>
          <InputCell dataKey="img" rowData={newData} />
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
