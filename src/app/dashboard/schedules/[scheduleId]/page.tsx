import { getAllCourses } from "@/services/course.service";
import ScheduleForm from "./components/ScheduleForm";
import { getScheduleById } from "@/services/schedule.service";

const ScheduleIdPage = async ({
  params
}: {
  params: { scheduleId: string };
}) => {
  const {courses} = await getAllCourses(1, "")
  const data =  await getScheduleById(parseInt(params.scheduleId));
  return <ScheduleForm initialize={data.data} courses={courses} />;
};

export default ScheduleIdPage;
