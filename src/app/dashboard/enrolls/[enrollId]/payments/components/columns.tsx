"use client";

import CellAction from "@/app/dashboard/payments/components/CellAction";
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
    id: "Action",
    cell: ({row}) => <CellAction data={row.original} />  // get from payments page
  }
];
