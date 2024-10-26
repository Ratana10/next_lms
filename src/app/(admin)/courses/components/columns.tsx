"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { formatToDollar } from "@/lib/formatted";
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
    cell: ({ row }) => (
      <div className="w-[50px] text-center">{row.getValue("no")}</div>
    ),
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
    cell: ({ row }) => <div className=" text-center">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Description"
      />
    ),
    cell: ({ row }) => (
      <div className=" text-center">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Price"
      />
    ),
    cell: ({ row }) => (
      <div className=" text-center">
        {formatToDollar(row.getValue("price"))}
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="Discount"
      />
    ),
    cell: ({ row }) => (
      <div className=" text-center">{row.original.discount}</div>
    ),
  },
  {
    accessorKey: "afterDis",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-center items-center"
        column={column}
        title="After Dis"
      />
    ),
    cell: ({ row }) => (
      <div className=" text-center">
        {formatToDollar(row.getValue("afterDis"))}
      </div>
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
    cell: ({ row }) => (
      <div className=" text-center">{row.getValue("teacher")}</div>
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
//     accessorKey: "description",
//     header: "Description",
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//     cell: ({ row }) => (
//       <div className="font-medium">{formatToDollar(row.getValue("price"))}</div>
//     ),
//   },
//   {
//     accessorKey: "discount",
//     header: "Discount",
//   },
//   {
//     accessorKey: "afterDis",
//     header: "AfterDis",
//     cell: ({ row }) => (
//       <div className="font-medium">
//         {formatToDollar(row.getValue("afterDis"))}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "teacher",
//     header: "Teacher",
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => <CellAction data={row.original} />,
//   },
// ];
