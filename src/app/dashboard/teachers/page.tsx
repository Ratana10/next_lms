import { getAllTeacher } from "@/services/teacher.service";
import TeacherClient from "./components/TeacherClient";
import { Teacher } from "@/types";
import { format } from "date-fns";
import { formattedDate, formattedGender, getNoNumber } from "@/lib/formatted";

const TeacherPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const { teachers, pagination } = await getAllTeacher(currentPage);

  const teacherFormatted = teachers.map((e: Teacher, index: number) => ({
    id: e.id,
    no: index + 1,
    code: e.code,
    firstname: e.firstname,
    lastname: e.lastname,
    gender: formattedGender(e.gender),
    hireDate: e.hireDate,
    email: e.email,
    phone: e.phone,
    address: e.address,
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));

  return (
    <div>
      <TeacherClient teachers={teacherFormatted} pagination={pagination} />
    </div>
  );
};

export default TeacherPage;
