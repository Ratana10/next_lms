"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { Account } from "@/types";
import { columns } from "./columns";
import { useRouter } from "next/navigation";

interface AccountClientProps {
  accounts: Account[];
}
const AccountClient = ({ accounts }: AccountClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Accounts" descritpion="Manage accounts" />
      </div>
      <Separator />
      <DataTable columns={columns} data={accounts} />
    </>
  );
};

export default AccountClient;
