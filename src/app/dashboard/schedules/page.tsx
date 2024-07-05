import { getAllSchedule } from '@/services/schedule.service'
import { Pagination, Schedule } from '@/types'
import React from 'react'
import ScheduleClient from './components/ScheduleClient'
import { format } from 'date-fns'
import { formatTimeTo12Hour } from '@/lib/formatTimeTo12Hour'
interface Response<T> {
  data: T;
  pagination: Pagination;
}
const SchedulePage = async () => {
  const data : Response<Schedule[]>  = await getAllSchedule(1)

  const scheduleFormatted = data.data.map((e: Schedule, index: number) => ({
    id: e.id,
    no: index + 1,
    course: e.course,
    day: e.day,
    startTime: formatTimeTo12Hour(e.startTime),
    endTime: formatTimeTo12Hour(e.endTime),
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
