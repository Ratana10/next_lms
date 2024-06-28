"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import PageSelection from "./PageSelection";
interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  isLast: boolean;
  isFirst: boolean;
}
const PaginationSection = ({
  currentPage,
  totalPages,
  isLast,
  isFirst,
}: PaginationSectionProps) => {
  const router = useRouter();

  const onPreviousPage = async () => {
    if (currentPage > 1) {
      router.push(`/dashboard/categories?page=${currentPage - 1}`);
    }
  };

  const onNextPage = () => {
    if (currentPage < totalPages) {
      router.push(`/dashboard/categories?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-6">
      {/* <div className="flex-1">
        <PageSelection />
      </div> */}
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
