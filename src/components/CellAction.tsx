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
import { Category } from "@/types";
import { deleteCategory } from "@/services/categories.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";

interface props<T> {
  data: T;
  onUpdate: (id: number)=> void;
}
const CellAction = <T extends { id: number }>({ data, onUpdate }: props<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  

  const onDelete = async () => {
    // try {
    //   await deleteCategory(data.id);
    //   setLoading(true);
    // } catch (error) {
    //   toast.error(`Error[Category]: ${error}`);
    // } finally {
    //   toast.success("Delete category successfully");
    //   //refresh data
    //   router.refresh();
    //   setOpen(false);
    //   setLoading(false);
    // }
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
