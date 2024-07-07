import { getAllEnrolls, getListEnroll } from "@/services/enroll.service"
import PaymentForm from "./components/PaymentForm"

const PaymentIdPage = async () => {
  const enrollsData = await getListEnroll()
  return (
    <PaymentForm initialize={null} />
  )
}

export default PaymentIdPage
