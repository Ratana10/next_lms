"use client";
import { Edit, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Schedule } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import { deleteSchedule } from "@/services/schedule.service";
import Link from "next/link";

interface props {
  data: Schedule;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = (id: number) => {
    router.push(`/schedules/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteSchedule(data.id);
      toast.success("Delete schedule successfully");
      router.refresh();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error(`${error}`);
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
      <div className="flex gap-1 items-center justify-center">
        {/* View students of this schedule course */}
        <Link href={`schedules/courses/${data.course.id}/students`}>
          <Button size="sm" className="bg-blue-500">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
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
