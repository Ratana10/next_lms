import { getAllTeacher } from "@/services/teacher.service";
import TeacherClient from "./components/TeacherClient";
import { Teacher } from "@/types";
import { format } from "date-fns";

const TeacherPage = async () => {
  const data = await getAllTeacher(10, 1);

  const teacherFormatted = data.data.map((e: Teacher, index: number) => ({
    id: e.id,
    no: index + 1,
    firstname: e.firstname,
    lastname: e.lastname,
    gender: e.gender === "FEMALE" ? "F" : "M",
    hireDate: e.hireDate,
    createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
    updatedAt: e.updatedAt
      ? format(new Date(e.updatedAt), "yyyy-MM-dd")
      : "...",
  }));

  return (
    <div>
      <TeacherClient teachers={teacherFormatted} pagination={data.pagination} />
    </div>
  );
};

export default TeacherPage;
