import TeacherForm from "./components/TeacherForm";
import { getTeacherById } from "@/services/teacher.service";

const TeacherIdPage = async ({ params }: { params: { teacherId: string } }) => {
  const { teacher } = await getTeacherById(parseInt(params.teacherId));

  return <TeacherForm initialize={teacher} />;
};

export default TeacherIdPage;
