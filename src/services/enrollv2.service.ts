"use server";

import { getToken } from "@/lib/session";
import { enrollV2Schema } from "@/schema/definition";
import { z } from "zod";

export async function getAllEnrolls({
  page,
  search,
  status,
  course,
}: {
  page: number;
  search: string;
  status: string;
  course: string;
}) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/enrolls?size=${size}&page=${page}&search=${search}&status=${status}&course=${course}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return {
    enrolls: data.data,
    pagination: data.pagination,
  };
}

export async function createEnroll(enroll: z.infer<typeof enrollV2Schema>) {
  const token = await getToken();

  console.log("server testing", enroll);
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/enrolls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(enroll),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return {
    enroll: data.data,
  };
}

export async function getEnrollById(enrollId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/enrolls/${enrollId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  
  return {
    enroll: data.data,
  };
}
