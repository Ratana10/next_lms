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
import { studentSchema } from "@/schema/definition";
import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "@/services/student.service";
import Heading from "@/components/Heading";
import { Trash } from "lucide-react";
import { Student } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { Modal } from "@/components/Modal";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ButtonLoading } from "@/components/ButtonLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentType {
  label: string;
  value: string;
}

const studentType: StudentType[] = [
  {
    label: "Study",
    value: "STUDY",
  },
  {
    label: "Work",
    value: "WORK",
  },
];

type StudentProp = {
  initialize: Student | null;
};

const StudentForm = ({ initialize }: StudentProp) => {
  const title = initialize ? "Edit student" : "Create student";
  const description = initialize ? "Edit a student" : "Add new student";
  const btnText = initialize ? "Save change" : "Create";

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialize || {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      gender: "MALE",
      type: "STUDY",
      position: "",
      from: "",
    },
  });

  const { watch, setValue } = form;

  useEffect(() => {
    const selectedType = watch("type");
    if (selectedType === "STUDY") {
      setValue("position", "Student");
    } else {
      setValue("position", "");
    }
  }, [watch("type"), setValue]);

  async function onSubmit(values: z.infer<typeof studentSchema>) {
    if (initialize) {
      // Update exists student
      try {
        setLoading(true);
        await updateStudent(initialize.id, values);
        toast.success("Update successfully");
        router.push("/dashboard/students");
        router.refresh();
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    } else {
      // Create new student
      try {
        setLoading(true);
        await createStudent(values);
        toast.success("Create successfully");
        router.push("/dashboard/students");
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
        await deleteStudent(initialize.id);
        setOpen(false);
        toast.success("delete successfully");
        router.push("/dashboard/students");
        router.refresh();
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <BackButton text="Back" href="/dashboard/students" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
        {initialize && (
          <>
            <Modal
              title={`Are you sure to delete ${initialize.firstname}?`}
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
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname *</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Enter firstname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex flex-row gap-2">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="MALE" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="FEMALE" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentType.map((e: StudentType) => (
                        <SelectItem key={e.value} value={e.value}>
                          {e.label}
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
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position test</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter from" {...field} />
                  </FormControl>
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

export default StudentForm;
