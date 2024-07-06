"use client";

import {   Enroll } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export const columns: ColumnDef<Enroll>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "student",
    header: "Student",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "remain",
    header: "Remain",
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
  }
];
