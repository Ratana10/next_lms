import React from "react";
import EnrollForm from "./components/EnrollForm";
import { getAllStudent, getStudentsList } from "@/services/student.service";
import { getCoursesList } from "@/services/course.service";

const EnrollIdPage = async ({
  params,
  searchParams,
}: {
  params: { enrollId: string };
  searchParams: { search?: string };
}) => {
  const search = searchParams?.search || "";

  const { courses } = await getCoursesList();
  const { students } = await getStudentsList();

  console.log("student", students)

  return <EnrollForm students={students} courses={courses} />;
};

export default EnrollIdPage;
