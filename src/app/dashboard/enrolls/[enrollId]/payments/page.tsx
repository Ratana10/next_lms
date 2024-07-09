import { getPaymentsByEnrollId } from "@/services/enroll.service";
import React from "react";
import EnrollPaymentClient from "./components/EnrollPaymentClient";
import { Payment } from "@/types";
import { formattedDate } from "@/lib/formatted";

const EnrollPaymentPage = async ({
  params,
}: {
  params: { enrollId: string };
}) => {
  const enrollId = Number(params.enrollId);

  const { payments } = await getPaymentsByEnrollId(enrollId);

  const formattedPayments = payments.map((e: Payment, index: number) => ({
    no: index + 1,
    id: e.id,
    amount: e.amount,
    date: formattedDate(e.date),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));
  return <EnrollPaymentClient payments={formattedPayments} />;
};

export default EnrollPaymentPage;
