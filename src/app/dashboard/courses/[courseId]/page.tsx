import React from "react";
import CourseForm from "./components/CourseForm";
import { getAllCategoriesV2 } from "@/services/categories.service";
import { getAllTeacher } from "@/services/teacher.service";
import { getCourseById } from "@/services/course.service";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const {course} = await getCourseById(parseInt(params.courseId));
  const categoriesData = await getAllCategoriesV2();
  const teachersData = await getAllTeacher(1);

  const categories = categoriesData.data;
  const teachers = teachersData.data;


  return (
    <CourseForm initialize={course} categories={categories} teachers={teachers} />
  );
};

export default CourseIdPage;
