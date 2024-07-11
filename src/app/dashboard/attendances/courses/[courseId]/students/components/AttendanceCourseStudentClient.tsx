"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Attendance, AttendanceDetail } from "@/types";
import BackButton from "@/components/BackButton";
import { Pagination } from "@/types/Pagination";
import PaginationSection from "@/components/PaginationSection";
import { usePathname, useRouter } from "next/navigation";
import { getNoNumber } from "@/lib/utils";
import { formattedDate } from "@/lib/formatted";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface AttendanceCourseStudentPageProp {
  data: Attendance[];
  attendanceDetails: AttendanceDetail[];
  pagination: Pagination;
}

const AttendanceCourseStudentClient = ({
  data,
  attendanceDetails,
  pagination,
}: AttendanceCourseStudentPageProp) => {
  const router = useRouter();
  const  pathname = usePathname();
  const [date, setDate] = useState<DateRange | undefined>();
  

  const formatted = attendanceDetails.map(
    (detail: AttendanceDetail, index: number) => ({
      no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
      id: detail.id,
      firstname: detail.student.firstname,
      lastname: detail.student.lastname,
      gender: detail.student.gender === "MALE" ? "M" : "F",
      status: detail.status,
      date: formattedDate(detail.date),
    })
  );

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`${pathname}?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`${pathname}?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <BackButton href="/dashboard/attendances" text="Back" />
      <div className="flex justify-between">
        <Heading
          title={`${data[0].courseName}`}
          descritpion="List of student's attendance"
        />
        {/* Date Picker Range */}
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <Separator />
      {/* Display attendance-details */}
      <DataTable columns={columns} data={formatted} />

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

export default AttendanceCourseStudentClient;
