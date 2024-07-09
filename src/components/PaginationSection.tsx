"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  isLast: boolean;
  isFirst: boolean;
  onPreviousPage: ()=>void;
  onNextPage: ()=>void;
}
const PaginationSection = ({
  currentPage,
  totalPages,
  isLast,
  isFirst,
  onPreviousPage,
  onNextPage,
}: PaginationSectionProps) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-6">
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isFirst}
          onClick={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isLast}
          onClick={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationSection;
