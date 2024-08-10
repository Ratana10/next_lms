import { getAllEnrolls } from "@/services/enroll.service";
import React from "react";
import EnrollClient, { FilterOption } from "./components/EnrollClient";
import { Course, Enroll } from "@/types";
import {
  formattedDate,
  formattedFullname,
  formatToDollar,
  getNoNumber,
} from "@/lib/formatted";
import { getCoursesList } from "@/services/course.service";

const EnrollPage = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    status: string;
    course: string;
  };
}) => {
  const page = Number(searchParams?.page || 1);
  const search = searchParams?.search || "";
  const status = searchParams?.status || "";
  const course = searchParams?.course || "";

  const { enrolls, pagination } = await getAllEnrolls({
    page,
    search,
    status,
    course,
  });
  const { courses } = await getCoursesList();

  const formattedCourses: FilterOption[] = courses.map(
    (e: Course, index: number) => ({
      label: e.name,
      value: e.name.toLocaleLowerCase(),
    })
  );

  const getTotalPaid = (total: number, remain: number) => total - remain;

  const formattedEnrolls = enrolls.map((e: Enroll, index: number) => ({
    id: e.id,
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    student: formattedFullname(e.student?.lastname, e.student?.firstname),
    paid: formatToDollar(getTotalPaid(e.total, e.remain)),
    coursePrice: formatToDollar(e.total),
    remain: formatToDollar(e.remain),
    status: e.status,
    date: formattedDate(e.date),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));
  return (
    <EnrollClient
      enrolls={formattedEnrolls}
      pagination={pagination}
      coursesOption={formattedCourses}
    />
  );
};

export default EnrollPage;
