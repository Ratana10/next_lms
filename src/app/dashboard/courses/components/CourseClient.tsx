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
import { Course, Pagination } from "@/types";

interface CourseClientProp {
  courses: Course[];
}

const CourseClient = ({ courses}: CourseClientProp) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Heading title="Courses" descritpion="Manage courses" />
        <Button onClick={() => router.push("/dashboard/courses/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <Separator />
      <Search placeholder="Search..." />
      <DataTable columns={columns} data={courses} />
    </>
  );
};

export default CourseClient;
