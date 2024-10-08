import { getCourseById, getStudentsEnrollCourseId } from "@/services/course.service";
import React from "react";
import CourseStudentClient from "./components/CourseStudentClient";
import { Student } from "@/types";
import { formattedDate, formattedEmail, formattedGender, formattedPhone, getNoNumber } from "@/lib/formatted";

const page = async ({ params }: { params: { courseId: string } }) => {
  const courseId = parseInt(params.courseId);
  const {course} = await getCourseById(courseId);

  const { students, pagination } = await getStudentsEnrollCourseId(courseId, 1);

  const studentsFormatted: Student[] = students.map(
    (e: Student, index: number) => ({
      id: e.id,
      no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
      firstname: e.firstname,
      lastname: e.lastname,
      gender: formattedGender(e.gender),
      phone: formattedPhone(e.phone),
      email: formattedEmail(e.email),
      createdAt: formattedDate(e.createdAt),
      updatedAt: formattedDate(e.updatedAt),
    })
  );

  return <CourseStudentClient course={course} students={studentsFormatted} pagination={pagination} />;
};

export default page;
