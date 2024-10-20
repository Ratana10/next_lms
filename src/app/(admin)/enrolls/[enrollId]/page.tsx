import React from "react";
import EnrollForm from "./components/EnrollForm";
import {  getStudentsList } from "@/services/student.service";
import { getCoursesList } from "@/services/course.service";

const EnrollIdPage = async ({
  params,
  searchParams,
}: {
  params: { enrollId: string };
  searchParams: { search?: string };
}) => {

  const { courses } = await getCoursesList();
  const { students } = await getStudentsList();


  return <EnrollForm students={students} courses={courses} />;
};

export default EnrollIdPage;
