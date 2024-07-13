import { getPaymentsByEnrollId } from "@/services/enroll.service";
import EnrollPaymentClient from "./components/EnrollPaymentClient";
import { Payment } from "@/types";
import { formattedDate, formatToDollar, getNoNumber } from "@/lib/formatted";

interface Props {
  params: {
    enrollId: string
  };
  searchParams: {
    page?: string;
  };
}
const EnrollPaymentPage = async ({ params, searchParams }: Props) => {

  const enrollId = Number(params.enrollId);
  const page = Number(searchParams?.page || 1);


  const { payments, pagination } = await getPaymentsByEnrollId(enrollId,page);

  const formattedPayments = payments.map((e: Payment, index: number) => ({
    no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
    id: e.id,
    amount: formatToDollar(e.amount),
    date: formattedDate(e.date),
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  }));
  return (
    <EnrollPaymentClient payments={formattedPayments} pagination={pagination} />
  );
};

export default EnrollPaymentPage;
