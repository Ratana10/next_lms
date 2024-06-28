"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PageSelection = () => {
  const router = useRouter();

  const [selected, setSelected] = useState("10");
  const pageNumbers = [
    {
      label: 5,
      value: "5",
    },
    {
      label: 10,
      value: "10",
    },
    {
      label: 15,
      value: "15",
    },
    {
      label: 20,
      value: "20",
    },
    {
      label: 25,
      value: "25",
    },
  ];
  const onChange = (value: string) => {
    setSelected(value);
    router.push(`/dashboard/categories?size=${value}`);
  };

  return (
    <div className="flex flex-row items-center text-sm text-muted-foreground">
      <div className="mr-2">Page</div>
      <div className="">
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageNumbers.map((page, index) => (
              <SelectItem key={index} value={page.value}>{page.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PageSelection;
