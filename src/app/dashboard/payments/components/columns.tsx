"use client";

import { formatToDollar } from "@/lib/formatted";
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
    cell: ({row}) => <div>{formatToDollar(row.getValue("amount"))}</div>
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
