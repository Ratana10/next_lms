import { getAllPayments } from "@/services/payment.service";
import { Payment } from "@/types";
import PaymentClient from "./components/PaymentClient";
import { formattedDate, formatToDollar, getNoNumber } from "@/lib/formatted";
import { PageProps } from "@/types/PageProps";

const PaymentPage = async ({ searchParams }: PageProps) => {
  const page = Number(searchParams?.page || 1);
  const search = searchParams?.search || "";
  const { payments, pagination } = await getAllPayments(page, search);

  const formattedPayments = payments.map((e: Payment, index: number) => ({
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    id: e.id,
    firstname: e.enroll?.student?.firstname,
    lastname: e.enroll?.student?.lastname,
    amount: formatToDollar(e.amount),
    date: formattedDate(e.date),
    method: e.method,
    receiver: e.receiver,
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));

  return <PaymentClient payments={formattedPayments} pagination={pagination} />;
};

export default PaymentPage;
