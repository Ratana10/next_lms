import { getAllCourses } from '@/services/course.service'
import React from 'react'

const AttendanceCourse = async () => {
  const {}=await getAllCourses();
  return (
    <div>
      
    </div>
  )
}

export default AttendanceCourse
