import React from "react";
import AttendanceCourseStudentClient from "./components/AttendanceCourseStudentClient";
import { getAttendanceByCourse } from "@/services/attendance.service";
import { getAttendanceDetailByCourse } from "@/services/attendance-detail.service";

const AttendanceCourseStudentPage = async ({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams?: {
    page?: string;
    startDate?: string;
    endDate?: string;
  };
}) => {
  const page = Number(searchParams?.page || 1);
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";

  const courseId = Number(params.courseId);
  
  const { attendances } = await getAttendanceByCourse(courseId);

  const { attendanceDetails, pagination } = await getAttendanceDetailByCourse(
    courseId,
    page,
    startDate,
    endDate
  );

  if(!attendances || attendances.length === 0) return;

  return (
    <AttendanceCourseStudentClient
      attendances={attendances}
      attendanceDetails={attendanceDetails}
      pagination={pagination}
    />
  );
};

export default AttendanceCourseStudentPage;
