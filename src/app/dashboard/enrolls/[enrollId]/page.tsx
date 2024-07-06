import React from "react";
import {  getCoursesList } from "@/services/course.service";
import EnrollForm from "./components/EnrollForm";
import { getStudentsList } from "@/services/student.service";
import { Option } from "@/components/ui/multiple-selector";

const EnrollIdPage = async ({ params }: { params: { enrollId: string } }) => {
  const coursesData = await getCoursesList();
  const studentData = await getStudentsList();
  
  const coursesOption: Option[] = coursesData.map((e: any, index: number) => ({
    label: e.name,
    value: e.id.toString(),
    diable: false,
    price: e.price,
  }));

  return (
    <EnrollForm initialize={null} students={studentData} coursesOption={coursesOption} />
  );
};

export default EnrollIdPage;
