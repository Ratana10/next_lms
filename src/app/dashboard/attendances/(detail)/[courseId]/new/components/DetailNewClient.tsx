"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { AttendanceDetail, Course, Student } from "@/types";
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
import toast from "react-hot-toast";
import BackButton from "@/components/BackButton";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";

export const attendanceStatus = ["PRESENT", "PERMISSION", "ABSENT"];

interface Props {
  courseId: number;
  course: Course;
  students: AttendanceDetail[];
  pagination: Pagination;
}
const DetailNewClient = ({ courseId, course, students, pagination }: Props) => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [attendanceData, setAttendanceData] = useState<{
    [key: string]: number[];
  }>({
    PRESENT: [],
    ABSENT: [],
    PERMISSION: [],
  });

  const [formattedStudents, setFormattedStudents] =
    useState<AttendanceDetail[]>(students);

  const onSelectChange = (studentId: number, status: string) => {
    setFormattedStudents((prevStudents) =>
      prevStudents.map((student) => {
        return student.student.id === studentId
          ? { ...student, status }
          : student;
      })
    );

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


  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/dashboard/attendances/${course.id}/new?page=${pagination.pageNumber - 1}`);
      router.refresh();
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/dashboard/attendances/${course.id}/new?page=${pagination.pageNumber + 1}`);
      router.refresh();
    }
  };

  const onCreate = async () => {
    const data = {
      courseId: course.id,
      date: format(date!, "yyyy-MM-dd"),
      attendance: attendanceData,
    };

    try {
      await createAttendance(data);
      router.push("/dashboard/attendances");
      router.refresh();
      toast.success("create attendance success")
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <BackButton text="Back" href="/dashboard/attendances" />
      <div className="flex justify-between">
        <Heading
          title={`${course.name} Attendance`}
          descritpion="Add new attendance"
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
            onSelect={(value) => setDate(value)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <DataTable
        columns={columns({ onSelectChange })}
        data={formattedStudents}
        
      />
      <PaginationSection
       isLast={pagination.last}
       isFirst={pagination.first}
       currentPage={pagination.pageNumber}
       totalPages={pagination.totalPages}
       onPreviousPage={onPreviousPage}
       onNextPage={onNextPage}
      />
    </>
  );
};

export default DetailNewClient;
