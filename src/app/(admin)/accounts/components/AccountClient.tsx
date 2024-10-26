"use client";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { Account } from "@/types";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/DataTable";

interface AccountClientProps {
  accounts: Account[];
}
const AccountClient = ({ accounts }: AccountClientProps) => {
  return (
    <>
      <div className="flex justify-between">
        <Heading title="Accounts" descritpion="Manage accounts" />
        <Link href="/accounts/new">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable columns={columns} data={accounts} />
    </>
  );
};

export default AccountClient;
