import { CircleArrowLeftIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import Link from "next/link";

interface BackButtonProps {
  text: string;
  href: string;
}
const BackButton = ({ text, href }: BackButtonProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="flex flex-row items-center" asChild>
            <Link href={href}>
              <CircleArrowLeftIcon className="w-4 h-4 mr-2" />
              {text}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BackButton;
