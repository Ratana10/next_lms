import ScheduleForm from "./components/ScheduleForm";
import { getCoursesList } from "@/services/course.service";
import { getScheduleById } from "@/services/schedule.service";

const ScheduleIdPage = async ({
  params
}: {
  params: { scheduleId: string };
}) => {
  const {courses} = await getCoursesList();
  const data =  await getScheduleById(parseInt(params.scheduleId));
  return <ScheduleForm initialize={data.data} courses={courses} />;
};

export default ScheduleIdPage;
