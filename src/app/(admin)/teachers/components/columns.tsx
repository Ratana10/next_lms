"use client";

import {  Teacher } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";


export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "firstname",
    header: "First name",
  },
  {
    accessorKey: "lastname",
    header: "Last name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
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
