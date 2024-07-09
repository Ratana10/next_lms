"use client";

import { formatToDollar } from "@/lib/utils";
import {  Payment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({row}) => formatToDollar(row.getValue("amount"))
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
];
