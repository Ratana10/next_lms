import ScheduleForm from "./components/ScheduleForm";
import { getCoursesList } from "@/services/course.service";
import { getScheduleById } from "@/services/schedule.service";
import { Course } from "@/types";

const ScheduleIdPage = async ({
  params
}: {
  params: { scheduleId: string };
}) => {
  const courses: Course[] = await getCoursesList();
  const data =  await getScheduleById(parseInt(params.scheduleId));
  console.table(data.data);
  return <ScheduleForm initialize={data.data} courses={courses} />;
};

export default ScheduleIdPage;
