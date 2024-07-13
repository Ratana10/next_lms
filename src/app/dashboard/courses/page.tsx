import React from "react";
import { getAllCourses } from "@/services/course.service";
import { Course } from "@/types";
import { format } from "date-fns";
import CourseClient from "./components/CourseClient";
import { formattedFullname, getNoNumber } from "@/lib/utils";
import { formattedDate } from "@/lib/formatted";

const CoursePage = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page || 1);
  const search = searchParams?.search || "";
  const {courses, pagination} = await getAllCourses(currentPage, search);

  const coursesFormatted = courses.map((e: Course, index: number) => ({
    id: e.id,
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    name: e.name,
    price: e.price,
    teacher: formattedFullname(e.teacher?.lastname, e.teacher?.firstname),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt)
  }));

  return (
    <CourseClient courses={coursesFormatted} pagination={pagination} />
  );
};

export default CoursePage;
