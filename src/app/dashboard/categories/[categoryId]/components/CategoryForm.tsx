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
import { categorySchema } from "@/schema/definition";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/categories.service";
import Heading from "@/components/Heading";
import { Trash } from "lucide-react";
import { Category } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { Modal } from "@/components/Modal";
import { Separator } from "@/components/ui/separator";

type CategoryProp = {
  initialize: Category | null;
};

const CategoryForm = ({ initialize }: CategoryProp) => {
  const title = initialize ? "Edit category" : "Create category";
  const description = initialize ? "Edit a category" : "Add new category";
  const btnText = initialize ? "Save change" : "Create";

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialize || {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    if (initialize) {
      // Update exists category
      try {
        await updateCategory(initialize.id, values);
        setLoading(true);
      } catch (error) {
        toast.error(`Error[Category]: ${error}`);
      } finally {
        setLoading(false);
        setOpen(false);
        toast.success("Update successfully");
        router.push("/dashboard/categories");
        router.refresh();
      }
    } else {
      // Create new category
      try {
        await createCategory(values);
        setLoading(true);
      } catch (error) {
        toast.error(`Error[Category]: ${error}`);
      } finally {
        setLoading(false);
        setOpen(false);
        toast.success("Create successfully");
        router.push("/dashboard/categories");
        router.refresh();
      }
    }
  }

  async function onDelete() {
    if (initialize && initialize.id) {
      try {
        await deleteCategory(initialize.id);
        setLoading(true);
      } catch (error) {
        toast.error(`Error[Category]: ${error}`);
      } finally {
        setLoading(false);
        setOpen(false);
        toast.success("delete successfully");
        router.push("/dashboard/categories");
      }
    }
  }

  return (
    <>
      <BackButton text="Back" href="/dashboard/categories" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
        {initialize && (
          <>
            <Modal
              title={`Are you sure to delete [${initialize.name}]?`}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Enter name" {...field} />
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

export default CategoryForm;
