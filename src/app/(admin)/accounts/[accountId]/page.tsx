
import { getCategoryById } from "@/services/categories.service";
import AccountForm from "./components/AccountForm";

const AccountIdPage = async ({
  params,
}: {
  params: { accountId: string };
}) => {

  const account = null;

  return <AccountForm initialize={account} />;
};

export default AccountIdPage;
