import ScheduleForm from './components/ScheduleForm'
import { getCoursesList } from '@/services/course.service'
import { Course } from '@/types';

const ScheduleIdPage =  async () => {
  const courses: Course[] = await getCoursesList();
  return (
    <ScheduleForm initialize={null} courses={courses} />
  )
}

export default ScheduleIdPage
