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
import { attendanceStatus } from "./DetailNewClient";
import { formattedFullname, formattedGender } from "@/lib/formatted";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ColumnsProps {
  onSelectChange: (studentId: number, status: string) => void;
  onReasonChange: (studentId: number, reason: string) => void;

}
export const columns = ({
  onSelectChange,
  onReasonChange
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
                  className={cn("font-medium  text-center inline-block",{
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
  // {
  //   accessorKey: "reason",
  //   header: "Reason",
  //   cell: ({ row }) => {
  //      const [reason, setReason] = useState(row.original.reason || "");

  //      const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       const newReason = e.target.value;
  //       setReason(newReason);
  //       onReasonChange(row.original.student.id, newReason)
  //      }

  //      return  row.original.status === "ABSENT" ? (
  //       <Input
  //       type="text"
  //       placeholder="Enter reason"
  //       value={reason} // Use local state here
  //       onChange={handleReasonChange}
  //     />
  //      ) : (
  //       <span>N?A</span>
  //      )
      
  //   }
     
  // },
  {
    accessorKey: "reason",
      header: "Reason",
      cell: ({row}) => {
        const [localReason, setLocalReason] = useState(row.original.reason || "");

        const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalReason(e.target.value); // Update only the local state
      };

      const handleReasonBlur = () => {
        onReasonChange(row.original.student.id, localReason); // Update parent state on blur
      };

       return (row.original.status === "ABSENT" || row.original.status === "PERMISSION") ? (
        <Input
          type="text"
          placeholder="Enter reason"
          value={localReason} // Use local state here
          onChange={handleReasonChange}
          onBlur={handleReasonBlur} // Update parent state only on blur
        />
      ) : (
        <span>N/A</span>
      );
      }
  }
];
