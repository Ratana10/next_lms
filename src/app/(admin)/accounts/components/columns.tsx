"use client";;
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Account } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Account>[] = [
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
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Last Name"
      />
    ),
    cell: ({ row }) => (
      <div className=" text-center">{row.original.lastname}</div>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Username"
      />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Role"
      />
    ),
    cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
  },
];
