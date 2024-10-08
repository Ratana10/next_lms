import { formattedDate, getNoNumber } from "@/lib/formatted";
import { getAttendanceDetailByCourse } from "@/services/attendance-detail.service";
import { getAttendanceByCourse } from "@/services/attendance.service";
import { AttendanceDetail } from "@/types";
import DetailClient from "./components/DetailClient";
import { getCourseById } from "@/services/course.service";

interface Params {
  courseId: string;
}

interface SearchParams {
  page?: string;
  startDate?: string;
  endDate?: string;
}

interface Props {
  params: Params;
  searchParams: SearchParams;
}

const DetailPage = async ({ params, searchParams }: Props) => {
  const page = Number(searchParams?.page || 1);
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";

  const courseId = Number(params.courseId);
  const { course } = await getCourseById(courseId);
  const { attendances } = await getAttendanceByCourse(courseId);

  const { attendanceDetails, pagination } = await getAttendanceDetailByCourse(
    courseId,
    page,
    startDate,
    endDate
  );

  const formattedAttDetails = attendanceDetails.map(
    (e: AttendanceDetail, index: number) => ({
      no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
      id: e.id,
      student: e.student,
      status: e.status,
      date: formattedDate(e.date),
    })
  );
  return (
    <DetailClient
      course={course}
      attendances={attendances}
      attendanceDetails={formattedAttDetails}
      pagination={pagination}
    />
  );
};

export default DetailPage;
