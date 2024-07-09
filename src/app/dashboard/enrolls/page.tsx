import { getAllEnrolls, getPaymentsByEnrollId } from "@/services/enroll.service";
import React from "react";
import EnrollClient from "./components/EnrollClient";
import { Enroll } from "@/types";
import { format } from "date-fns";
import { formattedDate } from "@/lib/formatted";

const EnrollPage = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    status: string;
  };
}) => {
  const page = Number(searchParams?.page || 1);
  const search = searchParams?.search || "";
  const status = searchParams?.status || "";

  const {enrolls, pagination} = await getAllEnrolls({page, search, status});


  const formattedEnrolls = enrolls.map((e: Enroll, index: number) => ({
    id: e.id,
    no: index + 1,
    student: e.student?.lastname + " " + e.student?.firstname,
    total: e.total,
    remain: e.remain,
    status: e.status,
    date: e.date,
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt)
  }));
  return (
    <EnrollClient enrolls={formattedEnrolls} pagination={pagination} />
  );
};

export default EnrollPage;
