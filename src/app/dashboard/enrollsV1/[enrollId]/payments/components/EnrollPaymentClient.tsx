"use client";

import { DataTable } from "@/components/DataTable";
import { Payment } from "@/types";
import { columns } from "./columns";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/BackButton";
import { Pagination } from "@/types/Pagination";
import PaginationSection from "@/components/PaginationSection";
import { usePathname, useRouter } from "next/navigation";

interface EnrollPaymentClientProp {
  payments: Payment[];
  pagination: Pagination;
}

const EnrollPaymentClient = ({
  payments,
  pagination,
}: EnrollPaymentClientProp) => {
  const router = useRouter();
  const pathname = usePathname();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`${pathname}?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`${pathname}?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <BackButton text="back" href="/dashboard/enrolls" />
      <div className="flex justify-between">
        <Heading title="View Payments" descritpion="List payments" />
      </div>
      <Separator className="my-4" />
      <DataTable data={payments} columns={columns} />
      {pagination.totalElements > 10 && (
        <PaginationSection
          isLast={pagination.last}
          isFirst={pagination.first}
          currentPage={pagination.pageNumber}
          totalPages={pagination.totalPages}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      )}
    </>
  );
};

export default EnrollPaymentClient;
