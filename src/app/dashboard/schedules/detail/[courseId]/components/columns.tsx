"use client";

import {   Schedule } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "startTime",
    header: "StartTime",
  },
  {
    accessorKey: "endTime",
    header: "EndTime",
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
