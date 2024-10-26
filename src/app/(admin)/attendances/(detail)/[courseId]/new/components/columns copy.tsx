"use client";

import { AttendanceDetail } from "@/types";
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
import { attendanceStatus } from "./DetailNewClient";
import { formattedFullname, formattedGender } from "@/lib/formatted";
import { cn } from "@/lib/utils";
import { ReasonCell } from "./ReasonCell";

interface ColumnsProps {
  onSelectChange: (studentId: number, status: string) => void;
  onReasonChange: (studentId: number, reason: string) => void;
}
export const columns = ({
  onSelectChange,
  onReasonChange,
}: ColumnsProps): ColumnDef<AttendanceDetail>[] => [
  {
    accessorKey: "no",
    header: "NO",
  },
  {
    accessorKey: "student",
    header: "Name",
    cell: ({ row }) =>
      formattedFullname(
        row.original.student.lastname,
        row.original.student.firstname
      ),
  },
  {
    accessorKey: "student.gender",
    header: "Gender",
    cell: ({ row }) => formattedGender(row.original.student.gender),
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
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {attendanceStatus.map((status) => (
              <SelectItem key={status} value={status}>
                <p
                  className={cn("font-medium  text-center inline-block", {
                    "text-green-500": status === "PRESENT",
                    "text-red-500": status === "ABSENT",
                    "text-yellow-500": status === "PERMISSION",
                  })}
                >
                  {status}
                </p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <ReasonCell
        studentId={row.original.student.id}
        initialReason={row.original.reason || ""}
        status={row.original.status}
        onReasonChange={onReasonChange}
      />
    ),
  },
];
