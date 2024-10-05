"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { enrollV2Schema } from "@/schema/definition";
import Heading from "@/components/Heading";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Course, Student } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ButtonLoading";
import { createEnroll } from "@/services/enrollv2.service";
import { formattedFullname, priceAfterDiscount } from "@/lib/formatted";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type EnrollFormProp = {
  students: Student[];
  courses: Course[];
};

const EnrollForm = ({ students, courses }: EnrollFormProp) => {
  const title = "Create enroll";
  const description = "Add new enroll";
  const btnText = "Create";

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const [openStudent, setOpenStudent] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);

  const form = useForm<z.infer<typeof enrollV2Schema>>({
    resolver: zodResolver(enrollV2Schema),
    defaultValues: {
      studentId: undefined,
      courseId: undefined,
      date: new Date(),
      amount: 0,
      method: "CASH",
      receiver: "",
    },
  });

  interface optionType {
    value: string;
    label: string;
  }

  const methodOption: optionType[] = [
    {
      value: "CASH",
      label: "Cash",
    },
    {
      value: "BANK",
      label: "Bank",
    },
  ];

  async function onSubmit(values: z.infer<typeof enrollV2Schema>) {
    try {
      setLoading(true);
      await createEnroll(values);
      toast.success("Create successfully");
      router.push("/enrolls");
      router.refresh();
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  const handleCourseChange = (courseId: number) => {
    const selectedCourse = courses.find((course) => course.id === courseId);
    const afterDis = priceAfterDiscount(
      selectedCourse!.price,
      selectedCourse!.discount
    );
    if (selectedCourse) {
      setTotal(afterDis); // Update total with the selected course's price
    } else {
      setTotal(0); // Reset total if no course is selected
    }
  };

  return (
    <>
      <BackButton text="Back" href="/enrolls" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Student <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover open={openStudent} onOpenChange={setOpenStudent}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openStudent}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? students.find(
                                (student: Student) => student.id === field.value
                              )
                              ? `${
                                  students.find(
                                    (student) => student.id === field.value
                                  )!.firstname
                                } ${
                                  students.find(
                                    (student) => student.id === field.value
                                  )!.lastname
                                }`
                              : "Select student"
                            : "Select student"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search student..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No student found.</CommandEmpty>
                          <CommandGroup>
                            {students.map((student: Student) => (
                              <CommandItem
                                key={student.id}
                                value={`${student.firstname} ${student.lastname}`}
                                onSelect={() => {
                                  form.setValue("studentId", student.id);
                                  setOpenStudent(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    student.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {formattedFullname(
                                  student.firstname,
                                  student.lastname
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course */}
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Course <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover open={openCourse} onOpenChange={setOpenCourse}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCourse}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? courses.find(
                                (course: Course) => course.id === field.value
                              )?.name
                            : "Select a course"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search course..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No course found.</CommandEmpty>
                          <CommandGroup>
                            {courses.map((course: Course) => (
                              <CommandItem
                                key={course.id}
                                value={course.name}
                                onSelect={() => {
                                  form.setValue("courseId", course.id);
                                  handleCourseChange(parseInt(course.id.toString()));
                                  setOpenCourse(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    course.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {course.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-between">
                    <FormLabel>Amount</FormLabel>
                    <FormLabel className="text-md text-green-600">
                      Total : {total} $
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {methodOption.map((item: optionType, index: number) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter receiver name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3">
                  <FormLabel>
                    Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading isLoading={loading} type="submit">
            {btnText}
          </ButtonLoading>
        </form>
      </Form>
    </>
  );
};

export default EnrollForm;
