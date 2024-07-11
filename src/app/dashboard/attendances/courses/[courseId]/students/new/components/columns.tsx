"use client";

import { Student } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { attendanceStatus } from "./StudentClient";

interface ColumnsProps {
  onSelectChange: (studentId: number, status: string) => void;
}
export const columns = ({
  onSelectChange,
}: ColumnsProps): ColumnDef<Student>[] => [
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
    cell: ({ row }) => (
      <Select onValueChange={(value) => onSelectChange(row.original.id, value)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select a attendance" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {attendanceStatus.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
];
