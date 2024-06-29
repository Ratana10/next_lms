import React from "react";
import TeacherForm from "./components/TeacherForm";
import { Teacher } from "@/types";
import { getTeacherById } from "@/services/teacher.service";

const TeacherIdPage = async ({ params }: { params: { teacherId: string } }) => {
  const teacher: Teacher = await getTeacherById(parseInt(params.teacherId));

  return <TeacherForm initialize={teacher} />;
};

export default TeacherIdPage;
