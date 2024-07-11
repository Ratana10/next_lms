"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Attendance, AttendanceDetail } from "@/types";
import BackButton from "@/components/BackButton";

const formattedData = (attendances: Attendance[]) => {
  const result: any = [];
  let index: number = 1;

  attendances.forEach((attendance: Attendance, attIndex: number) => {
    attendance.attendanceDetails.forEach(
      (detail: AttendanceDetail, detailIndex: number) => {
        const newData = {
          no: index++,
          id: detail.id,
          firstname: detail.student.firstname,
          lastname: detail.student.lastname,
          gender: detail.student.gender,
          status: detail.status,
          date: attendance.date,
        };
        result.push(newData);
      }
    );
  });
  return result;
};

interface AttendanceCourseStudentPageProp {
  data: Attendance[];
}

const AttendanceCourseStudentClient = ({
  data,
}: AttendanceCourseStudentPageProp) => {
  const formatted = formattedData(data);
  return (
    <>
      <BackButton href="/dashboard/attendances" text="Back" />
      <div className="flex justify-between">
        <Heading
          title={`${data[0].courseName}`}
          descritpion="List of student's attendance"
        />
        {/* Date Picker Range */}
        
      </div>
      <Separator />
      <DataTable  columns={columns} data={formatted} />
    </>
  );
};

export default AttendanceCourseStudentClient;
