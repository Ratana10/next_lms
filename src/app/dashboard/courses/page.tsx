import React from 'react'
import { getAllCourses } from '@/services/course.service';
import { Course } from '@/types';
import { format } from 'date-fns';
import CourseClient from './components/CourseClient';

const CoursePage = async () => {
  const data  = await getAllCourses(1, '');
  const coursesFormatted = data.data.map((e: any, index: number) => (
    {
      id: e.id,
      no: index+1,
      name: e.name,
      price: e.price,
      createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
      updatedAt: e.updatedAt ? format(new Date(e.updatedAt), "yyyy-MM-dd") : '...',
    }
  ))
  
  return (
    <CourseClient courses={coursesFormatted}  />
  )
}

export default CoursePage
