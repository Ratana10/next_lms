"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "price",
    header: "Price",
  }
];
