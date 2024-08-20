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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { courseSchema } from "@/schema/definition";

import Heading from "@/components/Heading";
import { Trash } from "lucide-react";
import { Category, Course, Teacher } from "@/types";
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
import { Textarea } from "@/components/ui/textarea";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/services/course.service";
import { ButtonLoading } from "@/components/ButtonLoading";

type CourseProp = {
  initialize: Course | null;
  categories: Category[];
  teachers: Teacher[];
};

const CourseForm = ({ initialize, categories, teachers }: CourseProp) => {
  const title = initialize ? "Edit course" : "Create course";
  const description = initialize ? "Edit a course" : "Add new course";
  const btnText = initialize ? "Save change" : "Create";

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialize || {
      name: "",
      categoryId: 0,
      price: 0,
      discount: 0,
      teacherId: undefined,
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof courseSchema>) {
    if (initialize) {
      try {
        setLoading(true);
        await updateCourse(initialize.id, values);
        toast.success("Update successfully");
        router.push("/dashboard/courses");
        router.refresh();
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await createCourse(values);
        toast.success("Create successfully");
        router.push("/dashboard/courses");
        router.refresh();
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    }
  }

  async function onDelete() {
    if (initialize && initialize.id) {
      try {
        setLoading(true);
        await deleteCourse(initialize.id);
        toast.success("Delete course successfully");
        router.push("/dashboard/courses");
        router.refresh();
        setOpen(false);
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <BackButton text="Back" href="/dashboard/courses" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
        {initialize && (
          <>
            <Modal
              title={`Are you sure to delete ${initialize.name}?`}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={initialize?.categoryId.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: Category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={initialize?.teacherId?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.map((teacher: Teacher) => (
                        <SelectItem
                          key={teacher.id}
                          value={teacher.id.toString()}
                        >
                          {teacher.firstname} {teacher.lastname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CourseForm;
