import {
  formattedDate,
  formatTimeTo12Hour,
  getNoNumber,
} from "@/lib/formatted";
import { getAllSchedule } from "@/services/schedule.service";
import { Schedule } from "@/types";
import React from "react";
import ScheduleClient from "./components/ScheduleClient";
import { PageProps } from "@/types/PageProps";

const SchedulePage = async ({ searchParams }: PageProps) => {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";

  const { schedules, pagination } = await getAllSchedule(currentPage, search);

  const formattedSchedules = schedules.map((e: Schedule, index: number) => ({
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    id: e.id,
    description: e.description,
    course: {
      id: e.course.id,
      name: e.course.name,
    },
    startDate: formattedDate(e.startDate.toString()),
    endDate: formattedDate(e.endDate.toString()),
    startTime: formatTimeTo12Hour(e.startTime),
    endTime: formatTimeTo12Hour(e.endTime),
    totalTime: e.totalTime,
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));

  return (
    <ScheduleClient schedules={formattedSchedules} pagination={pagination} />
  );
};

export default SchedulePage;
