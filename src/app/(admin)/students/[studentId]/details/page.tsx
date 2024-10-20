import { getEnrollsByStudentId } from "@/services/enrollv2.service";
import StudentDetail from "./components/StudentDetail";
import { getStudentById } from "@/services/student.service";
import { formattedDate, formatToDollar, getNoNumber, getTotalPaid } from "@/lib/formatted";
import { EnrollV2 } from "@/types";

const StudentIdPage = async ({ params }: { params: { studentId: string } }) => {
  const studentId = parseInt(params.studentId);
  const { student } = await getStudentById(studentId);
  const { enrolls } = await getEnrollsByStudentId(studentId);


  // const formattedEnrolls = enrolls.map((e: EnrollV2, index: number) => ({
  //   id: e.id,
  //   firstname: e.student?.firstname,
  //   lastname: e.student?.lastname,
  //   paid: formatToDollar(getTotalPaid(e.price, e.remain)),
  //   price: formatToDollar(e.price),
  //   remain: formatToDollar(e.remain),
  //   course: e.course?.name,
  //   status: e.status,
  //   date: formattedDate(e.date),
  //   createdAt: formattedDate(e.createdAt),
  //   updatedAt: formattedDate(e.updatedAt),
  // }));

  return <StudentDetail student={student} enrolls={enrolls} />;
};

export default StudentIdPage;
