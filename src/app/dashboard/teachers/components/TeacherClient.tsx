"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import PaginationSection from "@/components/PaginationSection";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable";
import {  Teacher } from "@/types";
import { columns } from "./columns";
import { Pagination } from "@/types/Pagination";

interface TeacherClientProp {
  teachers: Teacher[];
  pagination: Pagination;
}

const TeacherClient = ({ teachers, pagination }: TeacherClientProp) => {
  const router = useRouter();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/dashboard/teachers?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/dashboard/teachers?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Teachers" descritpion="Manage teachers" />
        <Button onClick={() => router.push("/dashboard/teachers/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={teachers} />

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

export default TeacherClient;
