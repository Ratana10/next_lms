import React from "react";
import EnrollForm from "./components/EnrollForm";
import { getStudentsList } from "@/services/student.service";
import { Option } from "@/components/ui/multiple-selector";
import { getEnrollById } from "@/services/enroll.service";
import { getCoursesList } from "@/services/course.service";
import { priceAfterDiscount } from "@/lib/formatted";

const EnrollIdPage = async ({ params }: { params: { enrollId: string } }) => {
  const { courses } = await getCoursesList();
  const { students } = await getStudentsList();
  const { enroll } = await getEnrollById(parseInt(params.enrollId));

  const coursesOption: Option[] = courses.map((e: any, index: number) => ({
    label: e.name,
    value: e.id.toString(),
    diable: false,
    price: priceAfterDiscount(e.price, e.discount),
  }));

  var newFormatted;
  if (enroll != null) {
    newFormatted = {
      studentId: enroll.student?.id.toString(),
      courses: enroll.courses?.map((e: any, index: number) => ({
        label: e.name,
        value: e.id.toString(),
        diable: true,
        price: priceAfterDiscount(e.price, e.discount),
      })),
      date: enroll.date,
      total: enroll.total,
    };
  }

  return (
    <EnrollForm
      initialize={newFormatted}
      students={students}
      coursesOption={coursesOption}
    />
  );
};

export default EnrollIdPage;
