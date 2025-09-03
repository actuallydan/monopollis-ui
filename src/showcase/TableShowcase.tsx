import { Table, Badge, Card, Paragraph } from "../components";

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
  ];

  const tableColumns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => (
        <Badge variant={info.getValue() === "Active" ? "success" : "warning"}>
          {info.getValue()}
        </Badge>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info: any) => info.getValue(),
    },
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
            columns={tableColumns as any}
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
