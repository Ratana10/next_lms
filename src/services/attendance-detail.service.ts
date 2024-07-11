"use server";

import { getToken } from "@/lib/session";

export async function getAttendanceDetailByCourse(
  courseId: number,
  page: number,
  startDate: string,
  endDate: string
) {
  const size = 10;
  const token = await getToken();

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/attendance-details?courseId=${courseId}&page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return {
    attendanceDetails: data.data,
    pagination: data.pagination,
  };
}
