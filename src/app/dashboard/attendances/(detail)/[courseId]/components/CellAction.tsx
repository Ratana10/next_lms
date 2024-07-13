"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AttendanceDetail, Course } from "@/types";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/services/categories.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import { deleteCourse } from "@/services/course.service";

interface props {
  data: AttendanceDetail;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
          <DropdownMenuItem
            disabled={loading}
            onClick={() =>
              router.push(`/dashboard/attendances/courses/${data.id}/students`)
            }
            className="cursor-pointer"
          >
            View attendances
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={() =>
              router.push(
                `/dashboard/attendances/courses/${data.id}/students/new`
              )
            }
            className="cursor-pointer"
          >
            Create Attendance
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
