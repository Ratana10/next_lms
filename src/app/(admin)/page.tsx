import { auth } from "@/auth";
import { getDashboardData } from "@/services/dashboard.service";
import DashboardClient from "./components/DashboardClient";

const DashboardPage = async () => {
  const session = await auth();

  const { dashboards } = await getDashboardData();
  return <DashboardClient dashboards={dashboards} />;
};

export default DashboardPage;
