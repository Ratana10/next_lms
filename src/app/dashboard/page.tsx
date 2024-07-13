import { auth } from "@/auth"

const DashboardPage = async () => {
  const session = await auth();
    return (
    <div>
      dashboard page
    </div>
  )
}

export default DashboardPage
