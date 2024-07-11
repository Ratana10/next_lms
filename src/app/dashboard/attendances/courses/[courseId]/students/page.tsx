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
  };
}) => {
  const page = Number(searchParams?.page || 1);
  const courseId = Number(params.courseId);
  const { attendances } = await getAttendanceByCourse(courseId);

  const { attendanceDetails, pagination } = await getAttendanceDetailByCourse(
    courseId,
    page
  );

  return (
    <AttendanceCourseStudentClient
      data={attendances}
      attendanceDetails={attendanceDetails}
      pagination={pagination}
    />
  );
};

export default AttendanceCourseStudentPage;
