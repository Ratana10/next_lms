import { getAllSchedule } from '@/services/schedule.service'
import { Pagination, Schedule } from '@/types'
import React from 'react'
import ScheduleClient from './components/ScheduleClient'
import { format } from 'date-fns'
interface Response<T> {
  data: T;
  pagination: Pagination;
}
const SchedulePage = async () => {
  const data : Response<Schedule[]>  = await getAllSchedule(1)
  console.table(data.data);

  const scheduleFormatted = data.data.map((e: Schedule, index: number) => ({
    id: e.id,
    no: index + 1,
    course: e.course,
    day: e.day,
    courseId: e.courseId,
    startTime: e.startTime,
    endTime: e.endTime,
    createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
    updatedAt: e.updatedAt
      ? format(new Date(e.updatedAt), "yyyy-MM-dd")
      : "...",
  }));

  return (
    <ScheduleClient schedules={scheduleFormatted} pagination={data.pagination} />
  )
}

export default SchedulePage
