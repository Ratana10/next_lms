"use client";

import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/types";
import { useRouter } from "next/navigation";
import { deleteStudent } from "@/services/student.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";

interface props {
  data: Student;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = (id: number) => {
    router.push(`/dashboard/students/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteStudent(data.id);
      router.refresh();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      toast.success("Delete student successfully");
    }
  };

  return (
    <>
      <Modal
        title={`Are you sure to delete ${data.firstname} ${data.lastname}?`}
        description="This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onDelete={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => onUpdate(data.id)}
            className="cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => setOpen(true)}
            className="text-red-500 cursor-pointer"
          >
            <Trash className="w-4 h-4 mr-2 " />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => router.push(`/dashboard/students/${data.id}/courses`)}
            className="cursor-pointer"
          >
            <Eye className="w-4 h-4 mr-2 "/>
            View courses
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
