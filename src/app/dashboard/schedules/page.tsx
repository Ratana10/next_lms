import { formattedDate, formattedFullname, getNoNumber } from "@/lib/formatted";
import { getAllCourses } from "@/services/course.service";
import { Course } from "@/types";
import { PageProps } from "@/types/PageProps";
import React from "react";
import CourseClient from "./components/CourseClient";

const SchedulePage = async ({ searchParams }: PageProps) => {
  const page = Number(searchParams?.page || 1);

  const {courses, pagination}=await getAllCourses(page, "");

  const coursesFormatted = courses.map((e: Course, index: number) => ({
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    id: e.id,
    name: e.name,
    price: e.price,
    teacher: formattedFullname(e.teacher?.lastname, e.teacher?.firstname),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),

  }));
  
  return <CourseClient courses={coursesFormatted} pagination={pagination} />;
};

export default SchedulePage;
