"use client";;
import { Edit, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";
import { useRouter } from "next/navigation";
import { deleteStudent } from "@/services/student.service";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import ModalStudent from "./ModalStudent";

interface props {
  data: Student;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalStudent, setModalStudent] = useState<boolean>(false);

  const onUpdate = (id: number) => {
    router.push(`/students/${id}`);
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

  const onViewDetail = (id: number) => {
    router.push(`/students/${id}/details`);
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
      <ModalStudent
        student={data}
        isOpen={modalStudent}
        onClose={() => setModalStudent(false)}
      />
      <div className="flex gap-1 items-center justify-center">
        <Button className="bg-blue-500" onClick={() => setModalStudent(true)}>
          <Eye className="w-4 h-4" />
        </Button>
        <Button className="bg-yellow-500" onClick={() => onUpdate(data.id)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button className="bg-red-500" onClick={() => setOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
