"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import PaginationSection from "@/components/PaginationSection";
import { Student } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Search from "@/components/Search";
import { Pagination } from "@/types/Pagination";
import Link from "next/link";

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
        <Link href={"/dashboard/students/new"}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <Separator />
      <div>
        <Search placeholder="Search by name, phone ..." />
      </div>
      <DataTable columns={columns} data={students} />

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

export default StudentClient;
