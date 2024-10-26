"use client";

import { Eye, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  data: Course;
}
const CellAction = ({ data }: Props) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/attendances/${data.id}/new`}>
              <Button size="sm" className="bg-yellow-500">
                <SquarePlus className="w-4 h-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create students attendance</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/attendances/${data.id}`} className="cursor-pointer">
              <Button size="sm" className="bg-blue-500">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>View students attendance</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CellAction;
