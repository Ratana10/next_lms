import { formattedDate } from "@/lib/formatted"
import { getAllAccounts } from "@/services/account.service"
import { Account } from "@/types"
import AccountClient from "./components/AccountClient"

const AccountPage = async () => {

  const {accounts} = await getAllAccounts()
  const formattedAccounts = accounts.map((e: Account, index: number) => ({
    id: e.id,
    no: index+1,
    firstname: e.firstname,
    lastname: e.lastname,
    username: e.username,
    role: e.role,
    createdAt: formattedDate(e.createdAt),
    updatedAt: formattedDate(e.updatedAt),
  })) 

  console.log(formattedAccounts)
  return <AccountClient accounts={formattedAccounts} />
}

export default AccountPage
