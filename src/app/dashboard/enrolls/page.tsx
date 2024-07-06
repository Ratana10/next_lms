import { getAllEnrolls } from "@/services/enroll.service";
import React from "react";
import EnrollClient from "./components/EnrollClient";
import { Response } from "@/types/Pagination";
import { Enroll } from "@/types";
import { format } from "date-fns";

const EnrollPage = async () => {
  const data = await getAllEnrolls(1);
  const formattedEnrolls = data.data.map((e: Enroll, index: number) => ({
    id: e.id,
    no: index + 1,
    student: e.student?.lastname + " " + e.student?.firstname,
    total: e.total,
    remain: e.remain,
    status: e.status,
    date: e.date,
    createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
    updatedAt: e.updatedAt
      ? format(new Date(e.updatedAt), "yyyy-MM-dd")
      : "...",
  }));
  return (
    <EnrollClient enrolls={formattedEnrolls} pagination={data.pagination} />
  );
};

export default EnrollPage;
