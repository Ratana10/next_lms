"use server";

import { getToken } from "@/lib/session";



export async function createAttendance(data: any) {
  const token = await getToken();

  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/attendances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

}