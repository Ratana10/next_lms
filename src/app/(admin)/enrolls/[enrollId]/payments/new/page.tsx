import { getEnrollById } from "@/services/enrollv2.service";
import EnrollPaymentForm from "./components/EnrollPaymentForm";

const EnrollPaymentpage = async ({
  params,
}: {
  params: { enrollId: string };
}) => {
  const { enroll } = await getEnrollById(parseInt(params.enrollId));
  console.log(enroll);
  return <EnrollPaymentForm initialize={enroll} />;
};

export default EnrollPaymentpage;
