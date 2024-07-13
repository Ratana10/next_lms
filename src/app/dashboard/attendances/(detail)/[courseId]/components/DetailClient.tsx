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
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface DetailProp {
  attendances: Attendance[];
  attendanceDetails: AttendanceDetail[];
  pagination: Pagination;
}

const DetailClient = ({
  attendances,
  attendanceDetails,
  pagination,
}: DetailProp) => {
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (date?.from && date?.to) {
      searchParams.set("startDate", format(date.from, "yyyy-MM-dd"));
      searchParams.set("endDate", format(date.to, "yyyy-MM-dd"));
    } else {
      searchParams.delete("startDate");
      searchParams.delete("endDate");
    }

    router.push(`${pathname}?${searchParams.toString()}`);
  }, [date, router]);

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
          title={`${attendances[0].courseName}`}
          descritpion="List of student's attendance"
        />
        {/* Date Picker Range */}
        <DatePickerWithRange
          placeholder="Pick date"
          date={date}
          setDate={setDate}
        />
      </div>
      <Separator />
      {/* Display attendance-details */}
      <DataTable columns={columns} data={attendanceDetails} />

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

export default DetailClient;
