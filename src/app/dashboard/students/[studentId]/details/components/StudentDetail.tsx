"use client";

import Heading from "@/components/Heading";
import { Course, Student } from "@/types";
import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type StudentProp = {
  student: Student;
  courses: Course[] | null;
};

const StudentDetail = ({ student, courses }: StudentProp) => {
  const title = "Student Detail";
  const description = "View student details";

  return (
    <>
      <BackButton text="Back" href="/dashboard/students" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
      </div>
      <Separator />
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              Firstname
            </h3>
            <p className="font-semibold text-lg">{student.firstname}</p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              Lastname
            </h3>
            <p className="font-semibold text-lg">{student.lastname}</p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              Phone
            </h3>
            <p className="font-semibold text-lg">{student.phone}</p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              Email
            </h3>
            <p className="font-semibold text-lg">{student.email}</p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              Gender
            </h3>
            <p className="font-semibold text-lg">{student.gender}</p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              Type
            </h3>
            <p className="font-semibold text-lg">{student.type}</p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              Position
            </h3>
            <p className="font-semibold text-lg">{student.position}</p>
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
              From
            </h3>
            <p className="font-semibold text-lg">{student.from}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg text-muted-foreground mb-3 from-neutral-400">
            Courses
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">NO</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses && courses.length > 0 ? (
                courses.map((course, index) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.price}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No courses available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default StudentDetail;
