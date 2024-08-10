"use server";

import { getToken } from "@/lib/session";
import { paymentSchema } from "@/schema/definition";
import { z } from "zod";

export async function getAllPayments(page: number, search: string) {
  let size = 10;
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/payments?size=${size}&page=${page}&search=${search}`,
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
    payments: data.data,
    pagination: data.pagination,
  };
}

export async function createPayment(payment: z.infer<typeof paymentSchema>) {
  const token = await getToken();
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payment),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return {
    payments: data.data,
    message: data.message,
  };
}

export async function deletePayment(paymentId: number) {
  const token = await getToken();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/payments/${paymentId}`,
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

  return null;
}
