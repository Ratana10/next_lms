import { getCourseById, getCourseSchedules } from "@/services/course.service";
import React from "react";
import { string } from "zod";
import ScheduleClient from "./components/ScheduleClient";
import { Schedule } from "@/types";
import {
  formattedDate,
  formatTimeTo12Hour,
  getNoNumber,
} from "@/lib/formatted";
interface Props {
  params: {
    courseId: string;
  };
  searchParams: {
    page?: string;
  };
}
const CourseSchedulePage = async ({ params, searchParams }: Props) => {
  const courseId = parseInt(params.courseId);
  const page = Number(searchParams?.page || 1);

  const { schedules, pagination } = await getCourseSchedules(courseId, page);
  
  const { course } = await getCourseById(courseId);

  const formattedSchedules = schedules.map((e: Schedule, index: number) => ({
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    id: e.id,
    courseId: e.courseId,
    course: e.course,
    day: e.day,
    startTime: formatTimeTo12Hour(e.startTime),
    endTime: formatTimeTo12Hour(e.endTime),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));

  return (
    <ScheduleClient
      schedules={formattedSchedules}
      pagination={pagination}
      course={course}
    />
  );
};

export default CourseSchedulePage;
