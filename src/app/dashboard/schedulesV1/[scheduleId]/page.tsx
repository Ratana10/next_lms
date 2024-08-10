import {  getCoursesList } from "@/services/course.service";
import ScheduleForm from "./components/ScheduleForm";
import { getScheduleById } from "@/services/schedule.service";

const ScheduleIdPage = async ({
  params
}: {
  params: { scheduleId: string };
}) => {
  const {courses} = await getCoursesList()
  const {schedule} =  await getScheduleById(parseInt(params.scheduleId));
  return <ScheduleForm initialize={schedule} courses={courses} />;
};

export default ScheduleIdPage;
