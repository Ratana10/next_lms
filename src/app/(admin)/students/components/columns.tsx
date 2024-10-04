"use client";

import { Student } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "phone",
    header: "Phone",
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
