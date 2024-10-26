import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ReasonCellProps {
  studentId: number;
  initialReason: string;
  status: string;
  onReasonChange: (studentId: number, reason: string) => void;
}

export const ReasonCell = ({ studentId, initialReason, status, onReasonChange }: ReasonCellProps) => {
  const [localReason, setLocalReason] = useState(initialReason);

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalReason(e.target.value);
  };

  const handleReasonBlur = () => {
    onReasonChange(studentId, localReason); 
  };

  if (status === "ABSENT" || status === "PERMISSION") {
    return (
      <Input
        type="text"
        placeholder="Enter reason"
        value={localReason} 
        onChange={handleReasonChange}
        onBlur={handleReasonBlur}
      />
    );
  }

  return <span>N/A</span>;
};
