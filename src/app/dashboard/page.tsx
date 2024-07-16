import { auth } from "@/auth";
import DashboardClient from "./(root)/components/DashboardClient";

const DashboardPage = async () => {
  const session = await auth();
  return <DashboardClient />;
};

export default DashboardPage;
