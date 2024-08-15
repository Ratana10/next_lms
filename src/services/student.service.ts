"use server";

import { getToken } from "@/lib/session";
import { studentSchema, teacherSchema } from "@/schema/definition";
import { z } from "zod";

export async function getAllStudent(page: number, search: string) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students?size=${size}&page=${page}&search=${search}`,
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

export async function getStudentsList() {
  
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students?all=true`,
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

  return {
    student: data.data,
    message: data.message,
    status: data.httpStatus
  };
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

  // we don't throw error becuase when student doen't exists we creaet the new one
  // if(!res.ok){
  //   throw new Error(data.message);
  // }
  return {
    student: data.data,
    message: data.message,
    status: data.httpStatus
  };
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

  return {
    student: data.data,
    message: data.message,
    status: data.httpStatus
  };
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

  return {
    student: data.data,
    message: data.message,
    status: data.httpStatus
  };
}

export async function getStudentsEnrollInCourse(studentId: number) {
  
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students/${studentId}/courses`,
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
  };
}


export async function getEnrollsByStudentId(studentId: number) {
  
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/students/${studentId}/enrolls`,
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
    enrolls: data.data,
  };
}