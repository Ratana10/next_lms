import { getAllPayments } from "@/services/payment.service"
import { Payment } from "@/types";
import PaymentClient from "./components/PaymentClient";
import { format } from "date-fns";
import { Response } from "@/types/Pagination";

const PaymentPage = async () => {
  const data : Response<Payment[]> = await getAllPayments(1);

  const payments : Payment[]  = data.data;

  const formattedPayments = payments.map((e:Payment, index: number) => ({
    no: index +1,
    id: e.id,
    amount: e.amount,
    date: format(new Date(e.date), "yyyy-MM-dd"),
    createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
    updatedAt: e.updatedAt ? format(new Date(e.updatedAt), "yyyy-MM-dd") : '...',
  }))

  // TODO update latter
  return (
    <PaymentClient payments={formattedPayments} pagination={data.pagination} />
  )
}

export default PaymentPage
