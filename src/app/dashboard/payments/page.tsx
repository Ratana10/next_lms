import { getAllPayments } from "@/services/payment.service";
import { Payment } from "@/types";
import PaymentClient from "./components/PaymentClient";
import { formattedDate, formatToDollar, getNoNumber } from "@/lib/formatted";
import { PageProps } from "@/types/PageProps";

const PaymentPage = async ({ searchParams }: PageProps) => {

  const page = Number(searchParams?.page || 1) 
  const { payments, pagination } = await getAllPayments(page);

  const formattedPayments = payments.map((e: Payment, index: number) => ({
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    id: e.id,
    amount: formatToDollar(e.amount),
    date: formattedDate(e.date),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));

  return <PaymentClient payments={formattedPayments} pagination={pagination} />;
};

export default PaymentPage;
