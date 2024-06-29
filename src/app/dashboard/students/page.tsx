import { getAllStudent } from "@/services/student.service";
import { Student } from "@/types";
import { format } from "date-fns";
import StudentClient from "./components/StudentClient";

const StudentPage = async () => {
  const data  = await getAllStudent(1);
console.log(data.data);

  const studentsFormatted: Student[] = data.data.map(
    (e: Student, index: number) => ({
      id: e.id,
      no: index + 1,
      firstname: e.firstname,
      lastname: e.lastname,
      // gender: e.gender,
      // phone: e.phone,
      createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
      updatedAt: e.updatedAt
        ? format(new Date(e.updatedAt), "yyyy-MM-dd")
        : "...",
    })
  );
  
  return <div>
    <StudentClient students={studentsFormatted} pagination={data.pagination} />
  </div>;
};

export default StudentPage;
