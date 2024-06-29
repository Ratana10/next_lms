"use server";

import { getToken } from "@/lib/session";
import {  teacherSchema } from "@/schema/definition";
import { z } from "zod";

export async function getAllTeacher(size: number, page: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/teachers?size=${size || 10}&page=${
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

  if (res.ok) {
    console.log("sucess");
    return data.data;
  } else {
    console.log("fail");
  }
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
  console.log("test res", data);

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

  if (res.ok) {
    console.log("sucess");
    return data.data;
  } else {
    console.log("fail");
  }
}
