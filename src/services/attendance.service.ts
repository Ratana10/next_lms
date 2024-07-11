"use server";

import { getToken } from "@/lib/session";

export async function createAttendance(value: any) {
  const token = await getToken();

  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/attendances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(value),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return {
    data,
  };
}

export async function getAttendanceByCourse(courseId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/attendances?courseId=${courseId}`,
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
    attendances: data.data,
  };
}
