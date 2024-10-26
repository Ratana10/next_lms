"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center uppercase"
        column={column}
        title="NO"
      />
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("no")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Name"
      />
    ),
  },
  {
    accessorKey: "teacher",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Teacher"
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
// export const columns: ColumnDef<Course>[] = [
//   {
//     accessorKey: "no",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           NO
//           <ArrowUpDown className="ml-2 h-3 w-3" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//           <ArrowUpDown className="ml-2 h-3 w-3" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: "teacher",
//     header: "Teacher",
//     cell: ({ row }) => (
//       <Badge className="bg-green-600 font-medium">
//         {row.getValue("teacher")}
//       </Badge>
//     ),
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => <CellAction data={row.original} />,
//   },
// ];
