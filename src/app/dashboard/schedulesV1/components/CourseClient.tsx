"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import PaginationSection from "@/components/PaginationSection";
import { Separator } from "@/components/ui/separator";
import { Course } from "@/types";
import { Pagination } from "@/types/Pagination";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CourseClientProp {
  courses: Course[];
  pagination: Pagination;
}

// display list of co
const CourseClient = async ({ courses, pagination }: CourseClientProp) => {
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
        <Heading title="Classes" descritpion="Manage classes's schedule" />
        <Button asChild>
          <Link href={"/dashboard/schedules/new"}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Link>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={courses} />
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

export default CourseClient;
