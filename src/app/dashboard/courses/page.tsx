import React from "react";
import { getAllCourses } from "@/services/course.service";
import { Course } from "@/types";
import { format } from "date-fns";
import CourseClient from "./components/CourseClient";

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
  const data = await getAllCourses(currentPage, search);

  const coursesFormatted = data.data.map((e: Course, index: number) => ({
    id: e.id,
    no: index + 1,
    name: e.name,
    price: e.price,
    teacher:
      e.teacher?.firstname && e.teacher?.lastname
        ? e.teacher?.firstname + " " + e.teacher?.lastname
        : "N/A",
    createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
    updatedAt: e.updatedAt
      ? format(new Date(e.updatedAt), "yyyy-MM-dd")
      : "...",
  }));

  return (
    <CourseClient courses={coursesFormatted} pagination={data.pagination} />
  );
};

export default CoursePage;
