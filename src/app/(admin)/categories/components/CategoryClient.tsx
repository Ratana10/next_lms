"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category } from "@/types";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";

interface CategoryClientProp {
  categories: Category[];
  pagination: Pagination;
}

const CategoryClient = ({ categories, pagination }: CategoryClientProp) => {
  const router = useRouter();

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      router.push(`/categories?page=${pagination.pageNumber - 1}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      router.push(`/categories?page=${pagination.pageNumber + 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading title="Categories" descritpion="Manage categories" />
        <Button onClick={() => router.push("/categories/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={categories} />

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

export default CategoryClient;
