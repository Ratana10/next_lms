import { getStudentsEnrollCourseId } from "@/services/course.service";
import StudentClient from "./components/StudentClient";
import { Student } from "@/types";

const AttendanceCourseStudentPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const courseId = Number(params.courseId);
  const { students } = await getStudentsEnrollCourseId(courseId);

  const formattedStudents = students.map((e: Student, index: number) => ({
    id: e.id,
    no: index + 1,
    firstname: e.firstname,
    lastname: e.lastname,
    gender: e.gender,
  }));

  return <StudentClient courseId={courseId} students={formattedStudents} />;
};

export default AttendanceCourseStudentPage;
