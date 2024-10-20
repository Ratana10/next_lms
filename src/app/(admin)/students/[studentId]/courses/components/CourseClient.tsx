"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Course, Student } from "@/types";
import BackButton from "@/components/BackButton";

interface CourseClientProp {
  courses: Course[];
  student: Student;
}

const CourseClient = ({ courses, student }: CourseClientProp) => {
  return (
    <>
      <BackButton text="Back" href="/students" />
      <div className="flex justify-between">
        <Heading
          title={`${student.firstname}'s courses`}
          descritpion="List of student courses"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={courses} />
    </>
  );
};

export default CourseClient;
