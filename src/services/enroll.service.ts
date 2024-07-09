"use server";

import { getToken } from "@/lib/session";
import { enrollSchema } from "@/schema/definition";
import { z } from "zod";

export async function getAllEnrolls(page: number, search: string) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/enrollments?size=${size}&page=${page}&search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  return{
    enrolls: data.data,
    pagination: data.pagination
  }
}


export async function createEnroll(enroll: z.infer<typeof enrollSchema>) {
  const token = await getToken();
  const courseIds = enroll.courses.map((e) => parseInt(e.value));

  const enrollRequest = {
    studentId: enroll.studentId,
    date: enroll.date,
    amount: enroll.amount,
    courseIds
  } 

  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(enrollRequest),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return {
    data: data.data
  };
}

// TODO latter
export async function updateEnroll(
  enrollId: number,
  enroll: z.infer<typeof enrollSchema>
) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/enrollments/${enrollId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(enroll),
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteEnroll(enrollId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/enrollments/${enrollId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
}


export async function getEnrollById(enrollId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/enrollments/${enrollId}`,
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
    enroll: data.enroll
  };
}
