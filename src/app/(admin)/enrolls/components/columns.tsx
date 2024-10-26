"use client";
import { Enroll } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
export const columns: ColumnDef<Enroll>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center uppercase"
        column={column}
        title="NO"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[50px] text-center">{row.getValue("no")}</div>
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Last Name"
      />
    ),
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="First Name"
      />
    ),
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Paid"
      />
    ),
  },
  {
    accessorKey: "remain",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Remain"
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      var status: string = row.getValue("status");
      const badgeClass = cn("font-medium", {
        "bg-green-600": status === "PAID",
        "bg-red-600": status === "UNPAID",
        "bg-yellow-600": status === "PARTIAL",
      });

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    accessorKey: "course",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Course"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Price"
      />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Date"
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
