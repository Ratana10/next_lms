"use server";

import { getToken } from "@/lib/session";
import { accountSchema } from "@/schema/definition";
import { z } from "zod";

export async function getAllAccounts() {
  try {
    const token = await getToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return {
      accounts: data.data,
    };
  } catch (error) {
    throw error;
  }
}

export async function createAccount(account: z.infer<typeof accountSchema>) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  if (!res.ok) {
    throw new Error("Failed to create account");
  }
}
