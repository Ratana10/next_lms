"use client";

import Link from "next/link";
import {
  Book,
  BookUser,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  Gauge,
  Package2,
  Shapes,
  Star,
  User,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  const navs = [
    {
      href: "/dashboard",
      label: "Dashboards",
      icon: <Gauge />,
    },
    {
      href: "/dashboard/categories",
      label: "Categories",
      icon: <Star />,
    },
    {
      href: "/dashboard/teachers",
      label: "Teachers",
      icon: <Users />,
    },
    {
      href: "/dashboard/students",
      label: "Students",
      icon: <BookUser />,
    },
    {
      href: "/dashboard/courses",
      label: "Courses",
      icon: <Book />,
    },
    {
      href: "/dashboard/schedules",
      label: "Schedules",
      icon: <CalendarCheck />,
    },
    {
      href: "/dashboard/enrolls",
      label: "Enrolls",
      icon: <Shapes />,
    },
    {
      href: "/dashboard/transactions",
      label: "Transactions",
      icon: <CreditCard />,
    },
    {
      href: "/dashboard/attendances",
      label: "Attendances",
      icon: <ClipboardCheck />,
    },
    {
      href: "/dashboard/accounts",
      label: "Accounts",
      icon: <User />,
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
            {navs.map((nav) => {
              const activeRoute = pathname.startsWith("/dashboard/")
                ? pathname.replace("/dashboard/", "").split("/")[0]
                : pathname;

              const isActive = nav.href.endsWith(activeRoute);

              return (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive ? "bg-slate-300" : ""
                  )}
                >
                  {nav.icon}
                  {nav.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
