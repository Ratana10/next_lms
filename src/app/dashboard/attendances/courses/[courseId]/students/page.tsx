import React from "react";
import AttendanceCourseStudentClient from "./components/AttendanceCourseStudentClient";
import { getAttendanceByCourse } from "@/services/attendance.service";

const AttendanceCourseStudentPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const courseId = Number(params.courseId);
  const { attendances } = await getAttendanceByCourse(courseId);

  // test data
  let index = 1;
  attendances.forEach((att: any) => {
    att.attendanceDetails.forEach((detail: any) => {
      console.log(
        index++,
        detail.student.firstname +
          detail.student.lastname +
          detail.student.gender +
          detail.status +
          att.date
      );
    });
  });

  return <AttendanceCourseStudentClient data={attendances} />;
};

export default AttendanceCourseStudentPage;
