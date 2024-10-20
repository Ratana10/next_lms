"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Attendance, AttendanceDetail, Course } from "@/types";
import BackButton from "@/components/BackButton";
import { Pagination } from "@/types/Pagination";
import PaginationSection from "@/components/PaginationSection";
import { usePathname, useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface DetailProp {
  attendances: Attendance[];
  attendanceDetails: AttendanceDetail[];
  pagination: Pagination;
  course: Course;
}

const DetailClient = ({
  attendances,
  attendanceDetails,
  pagination,
  course,
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
  }, [date, router, pathname]);

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
      <BackButton href="/attendances" text="Back" />
      <div className="flex justify-between">
        <Heading
          title={`${course.name}`}
          descritpion="List of student's attendance"
        />
        <div className="flex flex-row gap-5">
          {/* Date Picker Range */}

          <DatePickerWithRange
            placeholder="Pick date"
            date={date}
            setDate={setDate}
          />
          <Button asChild>
            <Link href={`/attendances/${course.id}/new`}>
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Link>
          </Button>
        </div>
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
