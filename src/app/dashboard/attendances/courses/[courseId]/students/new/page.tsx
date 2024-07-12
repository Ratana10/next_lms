import { getStudentsEnrollCourseId } from "@/services/course.service";
import { AttendanceDetail, Student } from "@/types";
import StudentClient from "./components/StudentClient";

const AttendanceCourseStudentPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const courseId = Number(params.courseId);
  const { students } = await getStudentsEnrollCourseId(courseId);

  // format Student to Attendance Detail
  const formattedStudents: AttendanceDetail[] = students.map(
    (e: Student, index: number) => ({
      no: index + 1,
      student: {
        id: e.id,
        firstname: e.firstname,
        lastname: e.lastname,
        gender: e.gender,
      },
      status: "",
      date: "",
    })
  );

  return <StudentClient courseId={courseId} students={formattedStudents} />;
};

export default AttendanceCourseStudentPage;
