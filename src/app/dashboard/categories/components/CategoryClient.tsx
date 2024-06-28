"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category, Pagination } from "@/types";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable";
import PaginationSection from "@/components/PaginationSection";

interface CategoryClientProp {
  categories: Category[];
  pagination: Pagination;
}

const CategoryClient = ({ categories, pagination }: CategoryClientProp) => {
  const router = useRouter();

  const totalPages = pagination.totalPages;
  const currentPage = pagination.pageNumber;
  const isLast = pagination.last;
  const isFirst = pagination.first;
  return (
    <>
      <div className="flex justify-between">
        <Heading title="Categories" descritpion="Manage categories" />
        <Button onClick={() => router.push("/dashboard/categories/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={categories} />

      <PaginationSection
        isLast={isLast}
        isFirst={isFirst}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default CategoryClient;
