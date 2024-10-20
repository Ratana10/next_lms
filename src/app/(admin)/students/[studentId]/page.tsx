import StudentForm from "./components/StudentForm";
import { getStudentById } from "@/services/student.service";

const StudentIdPage = async ({ params }: { params: { studentId: string } }) => {
  const { student } = await getStudentById(parseInt(params.studentId));
  return <StudentForm initialize={student} />;
};

export default StudentIdPage;
