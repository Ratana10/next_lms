"use client";

import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import { deleteCourse } from "@/services/course.service";

interface props {
  data: Course;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = (id: number) => {
    router.push(`/courses/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteCourse(data.id);
      toast.success("Delete course successfully");
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={`Are you sure to delete ${data.name}?`}
        description="This action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onDelete={onDelete}
        loading={loading}
      />
      <div className="flex gap-1 items-center justify-center">
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
