"use client";

import { DataTable } from "@/components/DataTable";
import { Payment } from "@/types";
import { columns } from "./columns";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/BackButton";

interface EnrollPaymentClientProp {
  payments: Payment[];
}

const EnrollPaymentClient = ({ payments }: EnrollPaymentClientProp) => {
  return (
    <>
      <BackButton text="back to enrolls" href="/dashboard/enrolls" />
      <div className="flex justify-between">
        <Heading title="View Payments" descritpion="List payments" />
      </div>
      <Separator className="my-4" />
      <DataTable data={payments} columns={columns} />
    </>
  );
};

export default EnrollPaymentClient;
