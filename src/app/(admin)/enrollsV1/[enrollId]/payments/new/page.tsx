import { getEnrollById } from "@/services/enroll.service";
import EnrollPaymentForm from "./components/EnrollPaymentForm";

const EnrollPaymentpage = async ({
  params,
}: {
  params: { enrollId: string };
}) => {
  const { enroll } = await getEnrollById(parseInt(params.enrollId));

  return <EnrollPaymentForm initialize={enroll} />;
};

export default EnrollPaymentpage;
