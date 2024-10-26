import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface ReasonCellProps {
  studentId: number;
  initialReason: string;
  status: string;
  onReasonChange: (studentId: number, reason: string) => void;
}

export const ReasonCell = ({
  studentId,
  initialReason,
  status,
  onReasonChange,
}: ReasonCellProps) => {
  const [localReason, setLocalReason] = useState(initialReason);

  useEffect(() => {
    if (status === "PRESENT") {
      setLocalReason("");
    }
  }, [status]);

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalReason(e.target.value);
  };

  const handleReasonBlur = () => {
    onReasonChange(studentId, localReason);
  };

  const placeholderText =
    status === "ABSENT"
      ? "Reason for absent"
      : status === "PERMISSION"
      ? "Reason for permission"
      : "N/A";

  return (
    <Input
      type="text"
      placeholder={placeholderText}
      value={localReason}
      disabled={status !== "ABSENT" && status !== "PERMISSION"}
      onChange={handleReasonChange}
      onBlur={handleReasonBlur}
    />
  );
};
