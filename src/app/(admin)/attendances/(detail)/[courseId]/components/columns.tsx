"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AttendanceDetail } from "@/types";
import CellAction from "./CellAction";
import { formattedGender } from "@/lib/formatted";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const columns: ColumnDef<AttendanceDetail>[] = [
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
        className="text-center flex justify-center items-center uppercase"
        column={column}
        title="First Name"
      />
    ),
    cell: ({ row }) => <div>{row.original.student.firstname}</div>,
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center uppercase"
        column={column}
        title="Last Name"
      />
    ),
    cell: ({ row }) => <div>{row.original.student.lastname}</div>,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center uppercase"
        column={column}
        title="Gender"
      />
    ),
    cell: ({ row }) => (
      <div>{formattedGender(row.original.student.gender)}</div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center uppercase"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      var status: string = row.getValue("status");
      return (
        <Badge
          className={cn("font-medium  text-center inline-block", {
            "bg-green-600": status === "PRESENT",
            "bg-yellow-600": status === "PERMISSION",
            "bg-red-600": status === "ABSENT",
          })}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reason",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center uppercase"
        column={column}
        title="Reason"
      />
    ),
    cell: ({ row }) => <div className="">{row.original.reason}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
