import React from "react";
import EnrollClient, { FilterOption } from "./components/EnrollClient";
import { Course, Enroll, EnrollV2 } from "@/types";
import {
  formattedDate,
  formattedFullname,
  formatToDollar,
  getNoNumber,
  getTotalPaid,
} from "@/lib/formatted";
import { getCoursesList } from "@/services/course.service";
import { getAllEnrolls } from "@/services/enrollv2.service";

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


  const formattedEnrolls = enrolls.map((e: EnrollV2, index: number) => ({
    id: e.id,
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    firstname: e.student?.firstname,
    lastname: e.student?.lastname,
    paid: formatToDollar(getTotalPaid(e.price, e.remain)),
    price: formatToDollar(e.price),
    remain: formatToDollar(e.remain),
    course: e.course?.name,
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
