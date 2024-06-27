"use client";

import { Category } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./CellAction";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "name",
    header: "Name",
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
