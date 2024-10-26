"use client";

import Heading from "@/components/Heading";
import { AttendanceDetail, Course } from "@/types";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Pagination } from "@/types/Pagination";
import { ButtonLoading } from "@/components/ButtonLoading";
import { DataTable } from "@/components/DataTable";

export const attendanceStatus = ["PRESENT", "PERMISSION", "ABSENT"];

interface Props {
  course: Course;
  students: AttendanceDetail[];
  pagination: Pagination;
}
const DetailNewClient = ({ course, students, pagination }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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

  const onReasonChange = (studentId: number, reason: string) => {
    setFormattedStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.student.id === studentId ? { ...student, reason } : student
      )
    );
  };

  const onCreate = async () => {
    const attendanceData = {
      PRESENT: formattedStudents
        .filter((student) => student.status === "PRESENT")
        .map((student) => student.student.id),
      ABSENT: formattedStudents
        .filter((student) => student.status === "ABSENT")
        .map((student) => student.student.id),
      PERMISSION: formattedStudents
        .filter((student) => student.status === "PERMISSION")
        .map((student) => student.student.id),
    };

    const reasons = formattedStudents
      .filter(
        (student) =>
          (student.status === "ABSENT" || student.status === "PERMISSION") &&
          student.reason
      )
      .reduce(
        (acc, student) => ({ ...acc, [student.student.id]: student.reason }),
        {}
      );

    const data = {
      courseId: course.id,
      date: format(date!, "yyyy-MM-dd"),
      attendance: attendanceData,
      reasons,
    };
    try {
      setLoading(true);
      await createAttendance(data);
      router.push("/attendances");
      router.refresh();
      toast.success("create attendance success");
    } catch (error: any) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton text="Back" href="/attendances" />
      <div className="flex justify-between">
        <Heading
          title={`${course.name} Attendance`}
          descritpion="Add new attendance"
        />
        <ButtonLoading isLoading={loading} onClick={onCreate}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </ButtonLoading>
      </div>
      <Separator />
      <div className="flex justify-end">
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
      </div>
      <DataTable
        columns={columns({ onSelectChange, onReasonChange })}
        data={formattedStudents}
        pagesize={pagination.totalElements}
      />
    </>
  );
};

export default DetailNewClient;
