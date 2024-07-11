"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import Search from "@/components/Search";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Course } from "@/types";
import { Pagination } from "@/types/Pagination";

interface AttendanceClientProp {
  courses: Course[];
  pagination: Pagination;
}

const AttendanceClient = ({ courses, pagination }: AttendanceClientProp) => {
  return (
    <>
      <div className="flex justify-between">
        <Heading title="Courses" descritpion="Manage courses" />
      </div>
      <Separator />
      <DataTable columns={columns} data={courses} />
    </>
  );
};

export default AttendanceClient;
