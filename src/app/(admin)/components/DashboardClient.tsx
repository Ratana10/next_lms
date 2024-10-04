"use client";

import { AreaChartComponent } from "@/components/AreaChartComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dashbord } from "@/types";
import { BookUser, Star, Users } from "lucide-react";

interface DashboardProps {
  dashboards: Dashbord;
}

const DashboardClient = ({ dashboards }: DashboardProps) => {
  const chartDataV2 = [
    { month: "January", nextjs: 186, springBoot: 80, sql: 50, react: 100 },
    { month: "February", nextjs: 220, springBoot: 90, sql: 60, react: 110 },
    { month: "March", nextjs: 250, springBoot: 100, sql: 70, react: 120 },
    { month: "April", nextjs: 200, springBoot: 110, sql: 80, react: 130 },
    { month: "May", nextjs: 230, springBoot: 120, sql: 90, react: 140 },
    { month: "June", nextjs: 240, springBoot: 130, sql: 100, react: 150 },
  ];

  const chartConfigV2 = {
    nextjs: {
      label: "Nextjs",
      color: "hsl(var(--chart-1))",
    },
    springBoot: {
      label: "SpringBoot",
      color: "hsl(var(--chart-2))",
    },
    sql: {
      label: "Sql",
      color: "hsl(var(--chart-3))",
    },
    react: {
      label: "React",
      color: "hsl(var(--chart-4))",
    },
  };

  const totalData = [
    {
      title: "Total Students",
      content: dashboards.totalStudents,
      icon: <BookUser />,
    },
    {
      title: "Total Teachers",
      content: dashboards.totalTeachers,
      icon: <Users />,
    },
    {
      title: "Total Courses",
      content: dashboards.totalCourses,
      icon: <Star />,
    },
  ];

  return (
    <>
      <div className="mb-3">
        <h1 className="text-4xl font-semibold">Overviews</h1>
      </div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {totalData.map((e, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{e.title}</CardTitle>
              {e.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{e.content}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AreaChartComponent
        data={chartDataV2}
        config={chartConfigV2}
        title="Area Chart - Stacked"
        description="Showing total visitors for the last 6 months"
        trendingText="Trending up by 5.2% this month"
        footerText="January - June 2024"
      />
    </>
  );
};

export default DashboardClient;
