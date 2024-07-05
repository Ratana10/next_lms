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
    accessorKey: "course",
    header: "Course",
    cell: ({row}) => (
      <div>{row.original.course?.name}</div>
    )
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
];
