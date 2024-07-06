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
import { enrollSchema } from "@/schema/definition";

import Heading from "@/components/Heading";
import { CalendarIcon, Trash } from "lucide-react";
import { Course, Enroll, Student } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { Modal } from "@/components/Modal";
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
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { createEnroll } from "@/services/enroll.service";

type EnrollFormProp = {
  initialize: Enroll | null;
  students: Student[];
  courses: Course[];
};

const EnrollForm = ({ initialize, students, courses }: EnrollFormProp) => {
  const title = initialize ? "Edit enroll" : "Create enroll";
  const description = initialize ? "Edit a enroll" : "Add new enroll";
  const btnText = initialize ? "Save change" : "Create";

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const coursesOption: Option[] = courses.map((e: any, index: number) => ({
    label: e.name,
    value: e.id.toString(),
    diable: false,
  }));

  const form = useForm<z.infer<typeof enrollSchema>>({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      studentId: 0,
      courses: [],
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof enrollSchema>) {
    console.log(values);
    // if (initialize) {
    //   try {
    //     setLoading(true);
    //     await updateEnroll(initialize.id, values);
    //     toast.success("Update successfully");
    //     router.push("/dashboard/enrolls");
    //     router.refresh();
    //   } catch (error) {
    //     toast.error(`${error}`);
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    //   try {
    //     setLoading(true);
    await createEnroll(values);
    //     toast.success("Create successfully");
    //     router.push("/dashboard/enrolls");
    //     router.refresh();
    //   } catch (error) {
    //     toast.error(`${error}`);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  }

  async function onDelete() {
    // if (initialize && initialize.id) {
    //   try {
    //     setLoading(true);
    //     await deleteEnroll(initialize.id);
    //     toast.success("Delete enroll successfully");
    //     router.push("/dashboard/enrolls");
    //     router.refresh();
    //     setOpen(false);
    //   } catch (error) {
    //     toast.error(`${error}`);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  }

  return (
    <>
      <BackButton text="Back" href="/dashboard/enrolls" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
        {initialize && (
          <>
            <Modal
              title={`Are you sure to delete ?`}
              description="This action cannot be undone."
              isOpen={open}
              onClose={() => setOpen(false)}
              onDelete={onDelete}
              loading={loading}
            />
            <Button
              disabled={loading}
              variant="destructive"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student: Student) => (
                        <SelectItem
                          key={student.id}
                          value={student.id.toString()}
                        >
                          {student.lastname + " " + student.firstname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="courses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frameworks</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={coursesOption}
                      hidePlaceholderWhenSelected
                      placeholder="Select frameworks you like..."
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Hire Date</FormLabel>
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
          <Button disabled={loading} type="submit">
            {btnText}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EnrollForm;
