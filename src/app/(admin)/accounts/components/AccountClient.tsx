"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { Account } from "@/types";
import { columns } from "./columns";

interface AccountClientProps {
  accounts: Account[];
}
const AccountClient = ({ accounts }: AccountClientProps) => {

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
