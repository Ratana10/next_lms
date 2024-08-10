"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { columns } from "./columns";
import { Course, Schedule } from "@/types";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";
import BackButton from "@/components/BackButton";

interface ScheduleClientProp {
  schedules: Schedule[];
  pagination: Pagination;
}

const ScheduleClient = ({
  schedules,
  pagination,
}: ScheduleClientProp) => {
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
      <BackButton text="Back" href="/dashboard/schedules" />
      <div className="flex justify-between">
        <Heading title="Schedules" descritpion="Manage schedules" />
        <Button onClick={() => router.push("/dashboard/schedules/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={schedules} />
      {pagination.totalPages !== 1 && (
        <PaginationSection
          isLast={pagination.last}
          isFirst={pagination.first}
          currentPage={pagination.numberOfElements}
          totalPages={pagination.totalPages}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      )}
    </>
  );
};

export default ScheduleClient;
