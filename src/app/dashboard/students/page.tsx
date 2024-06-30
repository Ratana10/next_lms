import { getAllStudent } from "@/services/student.service";
import { Student } from "@/types";
import { format } from "date-fns";
import StudentClient from "./components/StudentClient";

const StudentPage = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search || ""
  const data = await getAllStudent(currentPage, search);


  const studentsFormatted: Student[] = data.data.map(
    (e: Student, index: number) => ({
      id: e.id,
      no: index + 1,
      firstname: e.firstname,
      lastname: e.lastname,
      gender: e.gender === "MALE" ? "M" : "F",
      phone: e.phone,
      email: e.email,
      createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
      updatedAt: e.updatedAt
        ? format(new Date(e.updatedAt), "yyyy-MM-dd")
        : "...",
    })
  );

  return (
    <StudentClient students={studentsFormatted} pagination={data.pagination} />
  );
};

export default StudentPage;
