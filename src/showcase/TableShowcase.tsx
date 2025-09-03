import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Table, Badge, Card, Header, Paragraph } from "../components";

export default function TableShowcase() {
  // Sample table data
  const tableData = [
    {
      id: "1",
      name: "OTE 002",
      value: 705700,
      status: "Active",
      category: "Main Grp",
    },
    {
      id: "2",
      name: "OTE 003",
      value: 909964,
      status: "Inactive",
      category: "Main Grp",
    },
    {
      id: "3",
      name: "OTE 004",
      value: 396,
      status: "Active",
      category: "Periods",
    },
    {
      id: "4",
      name: "OTE 005",
      value: 68,
      status: "Active",
      category: "Periods",
    },
    {
      id: "5",
      name: "OTE 006",
      value: 1.6735,
      status: "Inactive",
      category: "Chem",
    },
    {
      id: "6",
      name: "OTE 007",
      value: 1105,
      status: "Active",
      category: "Chem",
    },
    {
      id: "7",
      name: "OTE 008",
      value: 234,
      status: "Active",
      category: "Main Grp",
    },
    {
      id: "8",
      name: "OTE 009",
      value: 567,
      status: "Inactive",
      category: "Periods",
    },
    {
      id: "9",
      name: "OTE 010",
      value: 890,
      status: "Active",
      category: "Chem",
    },
    {
      id: "10",
      name: "OTE 011",
      value: 123,
      status: "Active",
      category: "Main Grp",
    },
  ];

  const columnHelper = createColumnHelper<(typeof tableData)[0]>();

  const tableColumns: ColumnDef<(typeof tableData)[0]>[] = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("value", {
      header: "Value",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge variant={info.getValue() === "Active" ? "success" : "warning"}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div className="space-y-8">
      <Card title="Table Component" variant="bordered">
        <div className="space-y-4">
          <Paragraph size="sm">
            High-performance table with sorting, pagination, and monochromatic
            styling inspired by terminal interfaces.
          </Paragraph>

          <Table
            data={tableData}
            columns={
              tableColumns as unknown as ColumnDef<(typeof tableData)[0]>[]
            }
            maxHeight={400}
            enableSorting={true}
            enablePagination={true}
            pageSize={5}
          />
        </div>
      </Card>
    </div>
  );
}
