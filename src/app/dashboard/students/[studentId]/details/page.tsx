import StudentDetail from "./components/StudentDetail";
import {
  getStudentById,
  getStudentsEnrollInCourse,
} from "@/services/student.service";

const StudentIdPage = async ({ params }: { params: { studentId: string } }) => {
  const studentId = parseInt(params.studentId);
  const { student } = await getStudentById(studentId);
  const { courses } = await getStudentsEnrollInCourse(studentId);

  console.log(student)
  console.log(courses)

  return <StudentDetail student={student} courses={courses} />;
};

export default StudentIdPage;
