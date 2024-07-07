"use client";

import { DataTable } from "@/components/DataTable";
import { Payment } from "@/types";
import { columns } from "./columns";
import Heading from "@/components/Heading";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PaymentClientProp {
  payments: Payment[];
  pagination: Pagination;
}

const PaymentClient = ({ payments, pagination }: PaymentClientProp) => {
  const router = useRouter();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/dashboard/courses?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/dashboard/courses?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
      <Heading title="Payments" descritpion="Manage payments" />
        <Button onClick={() => router.push("/dashboard/payments/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable data={payments} columns={columns} />
      <PaginationSection
        isLast={pagination.last}
        isFirst={pagination.first}
        currentPage={pagination.pageNumber}
        totalPages={pagination.totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </>
  );
};

export default PaymentClient;
