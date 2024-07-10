"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Student } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createAttendance } from "@/services/attendance.service";
import { columns } from "./columns";

export const attendanceStatus = ["PRESENT", "PERMISSION", "ABSENT"];

interface StudentClientProp {
  students: Student[];
}
const StudentClient = ({ students }: StudentClientProp) => {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [attendanceData, setAttendanceData] = useState<{
    [key: string]: number[];
  }>({
    PRESENT: [],
    ABSENT: [],
    PERMISSION: [],
  });

  const onSelectChange = (studentId: number, status: string) => {
    setAttendanceData((prevState) => {
      const newState = { ...prevState };

      // Remove the studentId from other statuses
      attendanceStatus.forEach((s) => {
        if (s !== status) {
          newState[s] = newState[s].filter((id) => id !== studentId);
        }
      });

      // Toggle the selected status for the studentId
      const index = newState[status].indexOf(studentId);
      if (index === -1) {
        // Add the studentId to the selected status
        newState[status] = [...newState[status], studentId];
      } else {
        // Remove the studentId from the selected status
        newState[status] = [
          ...newState[status].slice(0, index),
          ...newState[status].slice(index + 1),
        ];
      }
      return newState;
    });
  };

  const onCreate = async () => {
    const data = {
      courseId: 1,
      date: date,
      attendance: attendanceData,
    };
    console.log("test data", data);
    await createAttendance(data);
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading
          title="Students Attendance"
          descritpion="Manage students attendance"
        />
        <Button onClick={onCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>
      <Separator />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <DataTable columns={columns({ onSelectChange })} data={students} />
    </>
  );
};

export default StudentClient;
