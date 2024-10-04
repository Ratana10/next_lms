"use client";

import { Eye, MoreHorizontal, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Course } from "@/types";
import Link from "next/link";

interface Props {
  data: Course;
}
const CellAction = ({ data }: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              href={`/attendances/${data.id}/new`}
              className="cursor-pointer"
            >
              <SquarePlus className="w-4 h-4 mr-2" />
              Create Attendance
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/attendances/${data.id}`}
              className="cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Attendances
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
