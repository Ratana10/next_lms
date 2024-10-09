"use client";

import Link from "next/link";
import {
  Book,
  BookUser,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  Gauge,
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
      href: "/",
      label: "Dashboards",
      icon: <Gauge />,
    },
    {
      href: "/categories",
      label: "Categories",
      icon: <Star />,
    },
    {
      href: "/teachers",
      label: "Teachers",
      icon: <Users />,
    },
    {
      href: "/students",
      label: "Students",
      icon: <BookUser />,
    },
    {
      href: "/courses",
      label: "Courses",
      icon: <Book />,
    },
    {
      href: "/schedules",
      label: "Schedules",
      icon: <CalendarCheck />,
    },
    {
      href: "/enrolls",
      label: "Enrolls",
      icon: <Shapes />,
    },
    {
      href: "/transactions",
      label: "Transactions",
      icon: <CreditCard />,
    },
    {
      href: "/attendances",
      label: "Attendances",
      icon: <ClipboardCheck />,
    },
    {
      href: "/accounts",
      label: "Accounts",
      icon: <User />,
    },
  ];
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-sm">Khmer GRS Academy</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navs.map((nav) => {
              const isActive =
                nav.href === "/"
                  ? pathname === "/" // Highlight only if the current path is exactly `/`
                  : pathname.startsWith(nav.href); // For other routes, check if it starts with the nav href

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
