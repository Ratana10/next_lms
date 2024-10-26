"use client";

import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/services/categories.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";

interface props {
  data: Category;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = (id: number) => {
    router.push(`/categories/${id}`);
  };

  const onDelete = async () => {
    try {
      await deleteCategory(data.id);
      setLoading(true);
      toast.success("Delete category successfully");
      //refresh data
      setLoading(false);
      router.refresh();
    } catch (error) {
      toast.error(`Error[Category]: ${error}`);
    } finally {
      setOpen(false);
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
      <div className="flex gap-2 items-center justify-center">
        <Button
          size="sm"
          className="bg-yellow-500"
          onClick={() => onUpdate(data.id)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-red-500" onClick={() => setOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
