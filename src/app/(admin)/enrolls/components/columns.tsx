"use client";

import { Enroll } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Enroll>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center "
        >
          NO
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center "
        >
          First Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center "
        >
          Last Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center "
        >
          Paid
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "remain",
    header: "Remain",
    cell: ({ row }) => (
      <div className="font-bold text-md">{row.getValue("remain")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      var status: string = row.getValue("status");
      const badgeClass = cn("font-medium", {
        "bg-green-600": status === "PAID",
        "bg-red-600": status === "UNPAID",
        "bg-yellow-600": status === "PARTIAL",
      });

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
