import { getAllCourses } from "@/services/course.service";
import React from "react";
import { Course } from "@/types";
import { formattedDate } from "@/lib/formatted";
import AttendanceClient from "./components/AttendanceClient";
import { formattedFullname, getNoNumber } from "@/lib/utils";
import { PageProps } from "@/types/PageProps";

const AttendancePage = async ({ searchParams }: PageProps) => {
  
  const page = Number(searchParams?.page || 1);

  const { courses, pagination } = await getAllCourses(page, "");

  const coursesFormatted = courses.map((e: Course, index: number) => ({
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    id: e.id,
    name: e.name,
    price: e.price,
    teacher: formattedFullname(e.teacher?.lastname, e.teacher?.firstname),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.createdAt),

  }));

  return (
    <AttendanceClient courses={coursesFormatted} pagination={pagination} />
  );
};

export default AttendancePage;
