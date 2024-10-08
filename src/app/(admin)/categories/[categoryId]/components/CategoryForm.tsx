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
import { ButtonLoading } from "@/components/ButtonLoading";
import { Textarea } from "@/components/ui/textarea";

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
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    if (initialize) {
      setLoading(true);
      toast
        .promise(updateCategory(initialize.id, values), {
          loading: "Updating category...",
          success: "Category updated successfully",
          error: "Failed to update category",
        })
        .then(() => {
          router.push("/categories");
          router.refresh();
        })
        .catch((error) => {
          console.error("Error updating category: ", error);
        })
        .finally(() => {
          setLoading(false);
          setOpen(false);
        });
    } else {
      // Create new category
      setLoading(true);
      toast
        .promise(createCategory(values), {
          loading: "Creating category...",
          success: "Category created successfully",
          error: "Failed to update category",
        })
        .then(() => {
          router.push("/categories");
          router.refresh();
        })
        .catch((error) => {
          console.error("Error creating category: ", error);
        })
        .finally(() => {
          setLoading(false);
          setOpen(false);
        });
    }
  }

  async function onDelete() {
    if (initialize && initialize.id) {
      try {
        setLoading(true);
        await deleteCategory(initialize.id);
        toast.success("delete successfully");
        router.push("/categories");
      } catch (error) {
        toast.error(`Error[Category]: ${error}`);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  }

  return (
    <>
      <BackButton text="Back" href="/categories" />
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
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
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
          </div>
          <ButtonLoading isLoading={loading} type="submit">
            {btnText}
          </ButtonLoading>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
