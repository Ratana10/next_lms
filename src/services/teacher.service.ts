"use server";

import { getToken } from "@/lib/session";
import { teacherSchema } from "@/schema/definition";
import { Teacher } from "@/types";
import { z } from "zod";

export async function getAllTeacher(page: number) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/teachers?size=${size}&page=${
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

  return {
    teachers: data.data,
    pagination: data.pagination,
  };
}

export async function getTeacherList() {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/teachers?all=true`,
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

  return {
    teachers: data.data,
  };
}

export async function createTeacher(teacher: z.infer<typeof teacherSchema>) {
  const token = await getToken();
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teacher),
  });

  return await res.json();
}

export async function getTeacherById(teacherId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/teachers/${teacherId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  if (!data.data) {
    return { teacher: null };
  }

  // convert hiredate, createdat, updatedat to Date
  const teacher: Teacher = {
    ...data.data,
    hireDate: new Date(data.data.hireDate),
    createdAt: new Date(data.data.createdAt),
    updatedAt: new Date(data.data.updatedAt),
  };

  return {
    teacher: teacher,
  };
}

export async function updateTeacher(
  teacherId: number,
  teacher: z.infer<typeof teacherSchema>
) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/teachers/${teacherId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teacher),
    }
  );
  const data = await res.json();

  if (res.ok) {
    console.log("sucess");
    return data.data;
  } else {
    console.log("fail");
  }
}

export async function deleteTeacher(teacherId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/teachers/${teacherId}`,
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
    throw new Error("Fail to delete teacher.")
  }
}
