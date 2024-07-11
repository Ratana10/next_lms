import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToDollar = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const getNoNumber = (
  index: number,
  pageNumber: number,
  pageSize: number
) => {
  return (pageNumber - 1) * pageSize + index + 1;
};
