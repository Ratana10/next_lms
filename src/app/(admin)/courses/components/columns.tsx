"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { Badge } from "@/components/ui/badge";
import { formatToDollar } from "@/lib/formatted";

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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="font-medium">{formatToDollar(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    
  },
  {
    accessorKey: "afterDis",
    header: "AfterDis",
    cell: ({ row }) => (
      <div className="font-medium">{formatToDollar(row.getValue("afterDis"))}</div>
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
