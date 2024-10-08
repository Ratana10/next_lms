"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Course } from "@/types";
import { Pagination } from "@/types/Pagination";
import PaginationSection from "@/components/PaginationSection";
import { useRouter } from "next/navigation";

interface AttendanceClientProp {
  courses: Course[];
  pagination: Pagination;
}

const AttendanceClient = ({ courses, pagination }: AttendanceClientProp) => {
 const router = useRouter();
 
  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/attendances?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/attendances?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Classes" descritpion="Manage student's attendance" />
      </div>
      <Separator />
      <DataTable columns={columns} data={courses} />
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

export default AttendanceClient;
