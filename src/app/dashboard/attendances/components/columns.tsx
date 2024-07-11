"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import CellAction from "./CellAction";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
    cell: ({ row }) => (
      <Badge className="bg-green-600 font-medium">
        {row.getValue("teacher")}
      </Badge>
    ),
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
