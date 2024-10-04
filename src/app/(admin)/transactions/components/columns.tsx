"use client";

import { Payment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "receiver",
    header: "Receiver",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
