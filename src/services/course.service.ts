"use server";

import { getToken } from "@/lib/session";
import { courseSchema, teacherSchema } from "@/schema/definition";
import { Course } from "@/types";
import { Response } from "@/types/Pagination";
import { z } from "zod";

export async function getAllCourses(page: number, search: string) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/courses?size=${size}&page=${page}&search=${search}`,
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
    courses: data.data,
    pagination: data.pagination
  };
}



export async function getCoursesList() {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/courses?all=true`,
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
    courses: data.data,
    pagination: data.pagination
  };
}


export async function createCourse(course: z.infer<typeof courseSchema>) {
  const token = await getToken();

  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getCourseById(courseId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/courses/${courseId}`,
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
    course: data.data,
    message: data.message,
    status: data.httpStatus
  };
}

export async function updateCourse(
  courseId: number,
  course: z.infer<typeof courseSchema>
) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/courses/${courseId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(course),
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteCourse(courseId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/courses/${courseId}`,
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

export async function getStudentsEnrollCourseId(courseId: number, page: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/courses/${courseId}/students`,
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
    students: data.data,
    pagination: data.pagination
  };
}



export async function getCourseSchedules(
  courseId: number,
  page: number
) {
  const size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/courses/${courseId}/schedules??size=${size}&page=${page}`,
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
    schedules: data.data,
    pagination: data.pagination,
  }
}