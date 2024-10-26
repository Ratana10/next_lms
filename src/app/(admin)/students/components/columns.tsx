"use client";

import { Student } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const columns: ColumnDef<Student>[] = [
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
        title="Last name"
      />
    ),
    cell: ({ row }) => (
      <div className=" text-center">{row.original.firstname}</div>
    ),
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="First name"
      />
    ),
    cell: ({ row }) => (
      <div className=" text-center">{row.original.firstname}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Gender"
      />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.gender}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Phone"
      />
    ),
    cell: ({ row }) => <div className=" text-center">{row.original.phone}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
