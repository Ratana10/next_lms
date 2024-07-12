"use client";

import { AttendanceDetail, Student } from "@/types";
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
}: ColumnsProps): ColumnDef<AttendanceDetail>[] => [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "student.firstname",
    header: "Firstname",
  },
  {
    accessorKey: "student.lastname",
    header: "Lastname",
  },
  {
    accessorKey: "student.gender",
    header: "Gender",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Select
        onValueChange={(value) =>
          onSelectChange(row.original.student.id, value)
        }
        value={row.original.status}
      >
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
