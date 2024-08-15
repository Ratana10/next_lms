import StudentDetail from "./components/StudentDetail";
import {
  getEnrollsByStudentId,
  getStudentById,
} from "@/services/student.service";

const StudentIdPage = async ({ params }: { params: { studentId: string } }) => {
  const studentId = parseInt(params.studentId);
  const { student } = await getStudentById(studentId);
  const { enrolls } = await getEnrollsByStudentId(studentId);

  console.log(student);
  console.log(enrolls);

  return <StudentDetail student={student} enrolls={enrolls} />;
};

export default StudentIdPage;
