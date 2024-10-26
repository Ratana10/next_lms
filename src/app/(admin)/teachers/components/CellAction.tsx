"use client";
import { Edit, Eye, Trash } from "lucide-react";
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
      <div className="flex gap-1 items-center justify-center">
        <Button
          size="sm"
          className="bg-blue-500"
          onClick={() => setPopup(true)}
        >
          <Eye className="w-4 h-4" />
        </Button>
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
