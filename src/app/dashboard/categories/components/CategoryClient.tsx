"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/DataTable";
import { Category } from "@/types";
import { columns } from "./columns";

interface CategoryClientProp {
  categories: Category[];
}

const CategoryClient = ({ categories }: CategoryClientProp) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between mb-4">
        <Heading title="Categories" descritpion="Manage categories" />
        <Button onClick={() => router.push("/dashboard/categories/new")}>
          <Plus />
          Add
        </Button>
      </div>
      <DataTable columns={columns} data={categories} />
    </>
  );
};

export default CategoryClient;
