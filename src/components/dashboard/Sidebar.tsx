import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Sidebar = () => {
  const navs = [
    {
      href: "/dashboard/categories",
      label: "Category",
      icon: <Home />,
    },
    {
      href: "/dashboard/teachers",
      label: "Teacher",
      icon: <Home />,
    },
    {
      href: "/dashboard/students",
      label: "Students",
      icon: <Home />,
    },
    {
      href: "/dashboard/courses",
      label: "Courses",
      icon: <Home />,
    },
    {
      href: "/dashboard/schedules",
      label: "Schedules",
      icon: <Home />,
    },
    {
      href: "/dashboard/enrolls",
      label: "Enroll",
      icon: <Home />,
    },
  ];
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Academy</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navs.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                {nav.icon}
                {nav.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
