import { getAllStudent } from "@/services/student.service";
import { Student } from "@/types";
import StudentClient from "./components/StudentClient";
import {
  formattedGender,
  formattedFullname,
  formattedDate,
  getNoNumber,
  formattedPhone,
  formattedEmail,
} from "@/lib/formatted";
import { PageProps } from "@/types/PageProps";

const StudentPage = async ({ searchParams }: PageProps) => {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const { students, pagination } = await getAllStudent(currentPage, search);

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

  return <StudentClient students={studentsFormatted} pagination={pagination} />;
};

export default StudentPage;
