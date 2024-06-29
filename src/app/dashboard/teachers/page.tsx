import { getAllTeacher } from "@/services/teacher.service";
import TeacherClient from "./components/TeacherClient";
import { Teacher } from "@/types";
import { format } from "date-fns";

const TeacherPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getAllTeacher(currentPage);

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
