import { auth } from "@/auth"

const DashboardPage = async () => {
  const session = await auth();
    return (
    <div>
      dashboard page
      {session?.user.username}
    </div>
  )
}

export default DashboardPage
