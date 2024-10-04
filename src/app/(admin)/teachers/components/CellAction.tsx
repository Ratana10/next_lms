"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";

import { Teacher } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteTeacher } from "@/services/teacher.service";
import { ModalTeacher } from "./ModalTeacher";

interface props {
  data: Teacher;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);

  const onUpdate = (id: number) => {
    router.push(`/teachers/${id}`);
  };

  const onDelete = async () => {
    try {
      await deleteTeacher(data.id);
      setLoading(true);
    } catch (error) {
      toast.error(`Error[Teacher]: ${error}`);
    } finally {
      toast.success("Delete teacher successfully");
      router.refresh();
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={`Are you sure to delete?`}
        description="This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onDelete={onDelete}
        loading={loading}
      />
      <ModalTeacher
        isOpen={popup}
        onClose={() => setPopup(false)}
        teacher={data}
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
            onClick={() => setPopup(true)}
            className="cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" /> View Detail
          </DropdownMenuItem>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
