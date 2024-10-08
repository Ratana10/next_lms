import {
  getCourseById,
  getStudentsEnrollCourseId,
} from "@/services/course.service";
import { AttendanceDetail, Student } from "@/types";
import DetailNewClient from "./components/DetailNewClient";
interface Prop {
  params: {
    courseId: string;
  };
  searchParams: {
    page?: string;
  };
}
const DetailNewPage = async ({ params, searchParams }: Prop) => {
  const courseId = Number(params.courseId);
  const page = Number(searchParams?.page) || 1;

  const { students, pagination } = await getStudentsEnrollCourseId(
    courseId,
    page
  );
  const { course } = await getCourseById(courseId);
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

  return (
    <DetailNewClient
      course={course}
      students={formattedStudents}
      pagination={pagination}
    />
  );
};

export default DetailNewPage;
