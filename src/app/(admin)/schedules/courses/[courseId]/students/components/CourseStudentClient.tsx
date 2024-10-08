"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import PaginationSection from "@/components/PaginationSection";
import Search from "@/components/Search";
import { Separator } from "@/components/ui/separator";
import { Course, Student } from "@/types";
import { Pagination } from "@/types/Pagination";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import BackButton from "@/components/BackButton";

interface Props {
  course: Course;
  students: Student[];
  pagination: Pagination;
}
const CourseStudentClient = ({ course, students, pagination }: Props) => {
  const router = useRouter();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/students?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/students?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <BackButton text="Back to schedule" href="/schedules" />
      <div className="flex justify-between">
        <Heading title={course.name} descritpion="Manage students" />
      </div>
      <Separator />
      <div>
        <Search placeholder="Search by name, phone ..." />
      </div>
      <DataTable columns={columns} data={students} />

      <PaginationSection
        isLast={pagination.last}
        isFirst={pagination.first}
        currentPage={pagination.pageNumber}
        totalPages={pagination.totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </>
  );
};

export default CourseStudentClient;
