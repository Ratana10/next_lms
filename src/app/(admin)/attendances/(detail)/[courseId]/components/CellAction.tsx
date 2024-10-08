"use client";

import { MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AttendanceDetail } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateAttendanceDetailStatus } from "@/services/attendance-detail.service";
import { attendanceStatus } from "../new/components/DetailNewClient";
import { cn } from "@/lib/utils";
import { ButtonLoading } from "@/components/ButtonLoading";

interface props {
  data: AttendanceDetail;
}
const CellAction = ({ data }: props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(data.status);
  const router = useRouter();

  const updateStatus = async () => {
    try {
      setLoading(true);
      await updateAttendanceDetailStatus(data.id, status);
      toast.success("Update successfully");
      router.refresh();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Edit status</DialogTitle>
            <DialogDescription>Update attendance status</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {attendanceStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        <p
                          className={cn(
                            "font-medium  text-center inline-block",
                            {
                              "text-green-500": status === "PRESENT",
                              "text-red-500": status === "ABSENT",
                              "text-yellow-500": status === "PERMISSION",
                            }
                          )}
                        >
                          {status}
                        </p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <ButtonLoading
              isLoading={loading}
              type="button"
              onClick={updateStatus}
            >
              Save change
            </ButtonLoading>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Pencil className="w-4 h-4 mr-2" /> Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
