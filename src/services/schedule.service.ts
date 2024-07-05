"use server";

import { getToken } from "@/lib/session";
import {  teacherSchema } from "@/schema/definition";
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
