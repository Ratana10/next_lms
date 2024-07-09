"use client";

import {
  CircleDollarSign,
  Edit,
  MoreHorizontal,
  Trash,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Enroll } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import { deleteEnroll } from "@/services/enroll.service";

interface props {
  data: Enroll;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = (id: number) => {
    router.push(`/dashboard/enrolls/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteEnroll(data.id);
      toast.success("Delete enroll successfully");
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const makePayment = (enrollmentId: number) => {
    router.push(`/dashboard/enrolls/${enrollmentId}/payments/new`);
  };

  const onViewPayment = async (enrollId: number) => {
    router.push(`/dashboard/enrolls/${enrollId}/payments`);
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
          {data.status !== "PAID" && (
            <DropdownMenuItem
              disabled={loading}
              onClick={() => makePayment(data.id)}
              className="cursor-pointer"
            >
              <CircleDollarSign className="w-4 h-4 mr-2" /> Make Payment
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            disabled={loading}
            onClick={() => onViewPayment(data.id)}
            className="cursor-pointer"
          >
            <Wallet className="w-4 h-4 mr-2" /> View Payments
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
