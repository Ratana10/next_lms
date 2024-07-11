"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      var status: string = row.getValue("status");
      const badgeClass = cn("font-medium", {
        "bg-green-600": status === "PRESENT",
        "bg-yellow-600": status === "PERMISSION",
        "bg-red-600": status === "ABSENT",
      });

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
