import { auth } from "@/auth"

const DashboardPage = async () => {
  const session = await auth();
  console.log("session" ,session);
  
  return (
    <div>
      dashboard page
      {session?.user.username}
    </div>
  )
}

export default DashboardPage
