import {  getCoursesList } from '@/services/course.service'
import React from 'react'
import { Course } from '@/types';
import { formattedDate } from '@/lib/formatted';
import AttendanceClient from './components/AttendanceClient';
import { formattedFullname } from '@/lib/utils';

const AttendancePage = async () => {
  const {courses, pagination}=await getCoursesList();
  
  const coursesFormatted = courses.map((e: Course, index: number) => ({
    id: e.id,
    no: index+1,
    name: e.name,
    price: e.price,
    teacher: formattedFullname(e.teacher?.lastname, e.teacher?.firstname),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.createdAt)
  }));
  
  return (
    <AttendanceClient courses={coursesFormatted} pagination={pagination} />
  )
}

export default AttendancePage
