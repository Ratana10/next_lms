import { getToken } from "@/lib/session";

export async function getDashboardData() {
  const token = await getToken();
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/dashboards`, {
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
    dashboards: data.data,
  };
}
