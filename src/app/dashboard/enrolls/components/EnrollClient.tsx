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
import {   Enroll } from "@/types";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";

interface EnrollClientProp {
  enrolls: Enroll[];
  pagination: Pagination;
}

const EnrollClient = ({ enrolls, pagination }: EnrollClientProp) => {
  const router = useRouter();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/dashboard/enrolls?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/dashboard/enrolls?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Enrolls" descritpion="Manage enrolls" />
        <Button onClick={() => router.push("/dashboard/enrolls/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator />
      <Search placeholder="Search student name ..." />
      <DataTable columns={columns} data={enrolls} />

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

export default EnrollClient;
