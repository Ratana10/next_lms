"use client";

import { formatToDollar } from "@/lib/formatted";
import {  Payment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
