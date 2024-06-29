"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import PaginationSection from "@/components/PaginationSection";
import { Pagination, Student } from "@/types";
import { Separator } from "@radix-ui/react-select";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

interface StudentClientProp {
  students: Student[];
  pagination: Pagination;
}

const StudentClient = ({ students, pagination }: StudentClientProp) => {
  const router = useRouter();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/dashboard/students?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/dashboard/students?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Students" descritpion="Manage students" />
        <Button onClick={() => router.push("/dashboard/students/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={students} />
{/* 
      <PaginationSection
        isLast={pagination.last}
        isFirst={pagination.first}
        currentPage={pagination.pageNumber}
        totalPages={pagination.totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      /> */}
    </>
  );
};

export default StudentClient;
