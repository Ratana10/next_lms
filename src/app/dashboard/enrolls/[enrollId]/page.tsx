import React from "react";
import { getCoursesList } from "@/services/course.service";
import EnrollForm from "./components/EnrollForm";
import { getStudentsList } from "@/services/student.service";
import { Option } from "@/components/ui/multiple-selector";
import { getEnrollById } from "@/services/enroll.service";
import { Enroll } from "@/types";

const EnrollIdPage = async ({ params }: { params: { enrollId: string } }) => {
  const coursesData = await getCoursesList();
  const studentData = await getStudentsList();
  const data = await getEnrollById(parseInt(params.enrollId));
  
  const coursesOption: Option[] = coursesData.map((e: any, index: number) => ({
    label: e.name,
    value: e.id.toString(),
    diable: false,
    price: e.price,
  }));


  const enroll: Enroll = data.data;
  var newData;
  if (enroll != null) {
    newData = {
      studentId: enroll.student?.id.toString(),
      courses: enroll.courses?.map((e: any, index: number) => ({
        label: e.name,
        value: e.id.toString(),
        diable: true,
        price: e.price,
      })),
      date: enroll.date,
      total: enroll.total,
    };
  }

  return (
    <EnrollForm
      initialize={newData}
      students={studentData}
      coursesOption={coursesOption}
    />
  );
};

export default EnrollIdPage;
