import { formatToDollar } from "@/lib/formatted";
import { getStudentById, getStudentsEnrollInCourse } from "@/services/student.service";
import { Course } from "@/types";
import React from "react";
import CourseClient from "./components/CourseClient";

const StudentCourse = async ({ params }: { params: { studentId: string } }) => {
  const { courses } = await getStudentsEnrollInCourse(
    parseInt(params.studentId)
  );

  const {student} = await getStudentById(parseInt(params.studentId))

  const coursesFormatted = courses.map((e: Course, index: number) => ({
    id: e.id,
    no: index + 1,
    name: e.name,
    price: formatToDollar(e.price),
  }));

  return <CourseClient courses={coursesFormatted} student={student} />;
};

export default StudentCourse;
