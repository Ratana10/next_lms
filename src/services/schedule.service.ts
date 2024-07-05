"use server";

import { getToken } from "@/lib/session";
import {  scheduleSchema, teacherSchema } from "@/schema/definition";
import { z } from "zod";

export async function getAllSchedule(page: number) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/schedules?size=${size}&page=${
      page || 1
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
}

export async function createSchedule(schedule: z.infer<typeof scheduleSchema>) {
  const token = await getToken();

  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(schedule),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateSchedule(
  scheduleId: number,
  schedule: z.infer<typeof scheduleSchema>
) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/schedules/${scheduleId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(schedule),
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}