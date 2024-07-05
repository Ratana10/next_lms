"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  scheduleSchema } from "@/schema/definition";

import Heading from "@/components/Heading";
import { Trash } from "lucide-react";
import {  Course, Schedule } from "@/types";
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
import { DayOfWeek, dayOfWeek } from "@/lib/dayOfWeek";
import { createSchedule, updateSchedule } from "@/services/schedule.service";

type ScheduleProp = {
  initialize: Schedule | null;
  courses: Course[];
};

const ScheduleForm = ({ initialize, courses }: ScheduleProp) => {
  const title = initialize ? "Edit schedule" : "Create schedule";
  const description = initialize ? "Edit a schedule" : "Add new schedule";
  const btnText = initialize ? "Save change" : "Create";

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      courseId: 0,
      day: "",
      startTime: "",
      endTime: "",
    },
  });

  async function onSubmit(values: z.infer<typeof scheduleSchema>) {
    if (initialize) {
      try {
        setLoading(true);
        await updateSchedule(initialize.id, values);
        toast.success("Update successfully");
        router.push("/dashboard/schedules");
        router.refresh();
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await createSchedule(values);
        toast.success("Create successfully");
        router.push("/dashboard/schedules");
        router.refresh();
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    }
  }

  async function onDelete() {}

  return (
    <>
      <BackButton text="Back" href="/dashboard/schedules" />
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={initialize?.course?.id.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course: Course) => (
                        <SelectItem
                          key={course.id}
                          value={course.id.toString()}
                        >
                          {course.name}
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
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dayOfWeek.map((day: DayOfWeek, index: number) => (
                        <SelectItem key={index} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl onChange={field.onChange}>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl onChange={field.onChange}>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {btnText}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ScheduleForm;
