"use server";

import { getToken } from "@/lib/session";
import { categorySchema } from "@/schema/definition";
import { Category } from "@/types";
import { z } from "zod";

export async function getAllCategories(page: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/categories?size=10&page=${page}`,
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
    categories: data.data,
    pagination: data.pagination,
  };
}

export async function getAllCategoriesV2() {
  const token = await getToken();
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

export async function createCategory(category: z.infer<typeof categorySchema>) {
  const token = await getToken();
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return {
    category: data.data,
    message: data.message,
    status: data.httpStatus,
  };
}

export async function getCategoryById(categoryId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/categories/${categoryId}`,
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
    category: data.data,
    message: data.message,
    status: data.httpStatus,
  };
}

export async function updateCategory(
  categoryId: number,
  category: z.infer<typeof categorySchema>
) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/categories/${categoryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return {
    category: data.data,
    message: data.message,
    status: data.httpStatus,
  };
}

export async function deleteCategory(categoryId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/categories/${categoryId}`,
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
    category: data.data,
    message: data.message,
    status: data.httpStatus,
  };
}
