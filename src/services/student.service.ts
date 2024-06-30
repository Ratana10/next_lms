"use server";

import { getToken } from "@/lib/session";
import { studentSchema, teacherSchema } from "@/schema/definition";
import { z } from "zod";

export async function getAllStudent(page: number) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students?size=${size}&page=${
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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function createStudent(student: z.infer<typeof studentSchema>) {
  const token = await getToken();

  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(student),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getStudentById(studentId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students/${studentId}`,
    {
      method: "GET",
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

  return data;
}

export async function updateStudent(
  studentId: number,
  student: z.infer<typeof studentSchema>
) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students/${studentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(student),
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteStudent(studentId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students/${studentId}`,
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

  return data;
}
