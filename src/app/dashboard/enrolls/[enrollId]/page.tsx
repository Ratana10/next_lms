import React from "react";
import {  getCoursesList } from "@/services/course.service";
import EnrollForm from "./components/EnrollForm";
import { getStudentsList } from "@/services/student.service";
import { getEnrollById } from "@/services/enroll.service";

const EnrollIdPage = async ({ params }: { params: { enrollId: string } }) => {
  const coursesData = await getCoursesList();
  const studentData = await getStudentsList();
  const enrollById = await getEnrollById(parseInt(params.enrollId));

  return (
    <EnrollForm initialize={null} students={studentData} courses={coursesData} />
  );
};

export default EnrollIdPage;
