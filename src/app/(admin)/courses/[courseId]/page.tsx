import React from "react";
import CourseForm from "./components/CourseForm";
import { getCategoryList } from "@/services/categories.service";
import { getTeacherList } from "@/services/teacher.service";
import { getCourseById } from "@/services/course.service";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { course } = await getCourseById(parseInt(params.courseId));
  const { categories } = await getCategoryList();
  const { teachers } = await getTeacherList();

  return (
    <CourseForm
      initialize={course}
      categories={categories}
      teachers={teachers}
    />
  );
};

export default CourseIdPage;
