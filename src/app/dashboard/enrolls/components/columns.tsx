"use client";

import {   Enroll } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { Badge } from "@/components/ui/badge";
import { cn} from "@/lib/utils";

export const columns: ColumnDef<Enroll>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "student",
    header: "Student",
  },
 
  {
    accessorKey: "remain",
    header: "Remain",
    cell: ({row}) => <div className="font-bold text-md">{row.getValue("remain")}</div> 
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      var status: string = row.getValue("status");
      const badgeClass = cn(
        "font-medium",
        {
          "bg-green-600": status === "PAID",
          "bg-red-600": status === "UNPAID",
          "bg-yellow-600": status === "PARTIAL",
        }
      );

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  }
];
