"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronDown, ChevronsUpDown, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { columns } from "./columns";
import {  Enroll } from "@/types";
import PaginationSection from "@/components/PaginationSection";
import { Pagination } from "@/types/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";

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

interface EnrollClientProp {
  enrolls: Enroll[];
  pagination: Pagination;
  coursesOption: FilterOption[] | null | undefined;
}

const EnrollClient = ({
  enrolls,
  pagination,
  coursesOption,
}: EnrollClientProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [course, setCourse] = useState(searchParams.get("course") || "");

  const [openCourse, setOpenCourse] = useState<boolean>(false);

  const onPreviousPage = () => {
    if (pagination.pageNumber > 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", (pagination.pageNumber - 1).toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const onNextPage = () => {
    if (pagination.pageNumber < pagination.totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", (pagination.pageNumber + 1).toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const onStatusClick = (value: any) => {
    const params = new URLSearchParams(searchParams);
    if (status === value) {
      setStatus("");
      params.delete("status");
    } else {
      params.set("status", value);
      setStatus(value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onCourseSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (course === value) {
      params.delete("course");
      setCourse("");
    } else {
      params.set("course", value);
      setCourse(value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  console.log("Course", coursesOption);
  return (
    <>
      <div className="flex justify-between">
        <Heading title="Enrolls" descritpion="Manage enrolls" />
        <Link href={"/enrolls/new"}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </Link>
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
              onValueChange={(value) => onStatusClick(value)}
            >
              {enrollStatus.map((status: FilterOption, index: number) => (
                <DropdownMenuRadioItem key={index} value={status.value}>
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {coursesOption && coursesOption.length > 0 && (
          <Popover open={openCourse} onOpenChange={setOpenCourse}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCourse}
                className="w-[150px] justify-between"
              >
                {course
                  ? coursesOption?.find((c) => c.value === course)?.label
                  : "Select Course"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search course..." />
                <CommandList>
                  <CommandEmpty>No course found.</CommandEmpty>
                  <CommandGroup>
                    {coursesOption?.map((item: FilterOption) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          onCourseSelect(item.value);
                          setOpenCourse(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            course === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
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
