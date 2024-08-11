import { auth } from "@/auth";
import DashboardClient from "./(root)/components/DashboardClient";
import { getDashboardData } from "@/services/dashboard.service";

const DashboardPage = async () => {
  const session = await auth();

  const { dashboards } = await getDashboardData();
  return <DashboardClient dashboards={dashboards} />;
};

export default DashboardPage;
