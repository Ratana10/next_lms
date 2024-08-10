"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { columns } from "./columns";
import { Course, Enroll } from "@/types";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FilterOption {
  label: string;
  value: string;
}

const enrollStatus: FilterOption[] = [
  {
    label: "UNPAID",
    value: "UNPAID",
  },
  {
    label: "PARTIAL",
    value: "PARTIAL",
  },
  {
    label: "PAID",
    value: "PAID",
  },
];

const coursesOption: FilterOption[] = [
  {
    label: "Nextjs",
    value: "1",
  },
  {
    label: "Srpingboot",
    value: "2",
  },
  {
    label: "Spring",
    value: "3",
  },
];

interface EnrollClientProp {
  enrolls: Enroll[];
  pagination: Pagination;
  coursesOption: FilterOption[] | null;
}

const EnrollClient = ({
  enrolls,
  pagination,
  coursesOption,
}: EnrollClientProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [course, setCourse] = useState(searchParams.get("course") || "");

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

  const onclick = (value: any) => {
    const params = new URLSearchParams(searchParams);
    if (status === value) {
      setStatus("");
      params.delete("status");
    } else {
      params.set("status", value);
      setStatus(value);
    }
    setStatus(value);
    replace(`${pathname}?${params.toString()}`);
  };

  const onCourseClick = (value: any) => {
    const params = new URLSearchParams(searchParams);
    if (status === value) {
      setStatus("");
      params.delete("course");
    } else {
      params.set("course", value);
      setStatus(value);
    }
    setCourse(value);
    replace(`${pathname}?${params.toString()}`);
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
      <div className="flex gap-2">
        <Search placeholder="Search student name ..." />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Status <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={(value) => onclick(value)}
            >
              {enrollStatus.map((status: FilterOption, index: number) => (
                <DropdownMenuRadioItem key={index} value={status.value}>
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Courses <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={course}
              onValueChange={(value) => onCourseClick(value)}
            >
              {coursesOption?.map((course: FilterOption, index: number) => (
                <DropdownMenuRadioItem key={index} value={course.value}>
                  {course.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
