"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AttendanceDetail } from "@/types";
import CellAction from "./CellAction";
import { formattedFullname, formattedGender } from "@/lib/formatted";

export const columns: ColumnDef<AttendanceDetail>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) =>
      formattedFullname(
        row.original.student.lastname,
        row.original.student.firstname
      ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => formattedGender(row.original.student.gender),
  },
  {
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
