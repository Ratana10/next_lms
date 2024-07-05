"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import {   Schedule } from "@/types";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";

interface ScheduleClientProp {
  schedules: Schedule[];
  pagination: Pagination;
}

const ScheduleClient = ({ schedules, pagination }: ScheduleClientProp) => {
  const router = useRouter();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/dashboard/schedules?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/dashboard/schedules?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Schedules" descritpion="Manage schedules" />
        <Button onClick={() => router.push("/dashboard/schedules/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator />
      <Search placeholder="Search..." />
      <DataTable columns={columns} data={schedules} />

      <PaginationSection
        isLast={pagination.last}
        isFirst={pagination.first}
        currentPage={pagination.numberOfElements}
        totalPages={pagination.totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </>
  );
};

export default ScheduleClient;
