import { Student } from "@/types";
import StudentForm from "./components/StudentForm";
import { getStudentById } from "@/services/student.service";

interface StudentIdPage {
  initalize: Student;
}
const StudentIdPage = async ({ params }: { params: { studentId: string } }) => {
  const data = await getStudentById(parseInt(params.studentId));
  const student: Student = data.data;
  return <StudentForm initialize={student} />;
};

export default StudentIdPage;
