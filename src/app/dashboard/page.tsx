import { auth } from "@/auth";
import DashboardClient from "./components/DashboardClient";

const DashboardPage = async () => {
  const session = await auth();
  return <DashboardClient />;
};

export default DashboardPage;
