"use client";;
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Payment } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import { deletePayment } from "@/services/payment.service";

interface props {
  data: Payment;
}
const CellAction = ({ data }: props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      await deletePayment(data.id);
      setLoading(true);
      toast.success("Delete payments successfully");
      //refresh data
      setLoading(false);
      router.refresh();
    } catch (error) {
      toast.error(`ERROR: ${error}`);
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
        <Button className="bg-red-500" onClick={() => setOpen(true)}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
