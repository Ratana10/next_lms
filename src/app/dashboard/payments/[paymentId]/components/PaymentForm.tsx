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
import Heading from "@/components/Heading";
import { CalendarIcon, Trash } from "lucide-react";
import { Enroll, Payment } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { Modal } from "@/components/Modal";
import { Separator } from "@/components/ui/separator";
import { paymentSchema } from "@/schema/definition";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PaymentProp = {
  initialize: Payment | null;
  // enrolls: Enroll[]
};

const PaymentForm = ({ initialize }: PaymentProp) => {
  const title = initialize ? "Edit payment" : "Create payment";
  const description = initialize ? "Edit a payment" : "Add new payment";
  const btnText = initialize ? "Save change" : "Create";

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      enrollmentId: 0,
      amount: 0,
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof paymentSchema>) {
    // if (initialize) {
    //   // Update exists payment
    //   try {
    //     await updatePayment(initialize.id, values);
    //     setLoading(true);
    //   } catch (error) {
    //     toast.error(`Error[Payment]: ${error}`);
    //   } finally {
    //     setLoading(false);
    //     setOpen(false);
    //     toast.success("Update successfully");
    //     router.push("/dashboard/categories");
    //     router.refresh();
    //   }
    // } else {
    //   // Create new payment
    //   try {
    //     await createPayment(values);
    //     setLoading(true);
    //   } catch (error) {
    //     toast.error(`Error[Payment]: ${error}`);
    //   } finally {
    //     setLoading(false);
    //     setOpen(false);
    //     toast.success("Create successfully");
    //     router.push("/dashboard/categories");
    //     router.refresh();
    //   }
    // }
  }

  async function onDelete() {
    // if (initialize && initialize.id) {
    //   try {
    //     await deletePayment(initialize.id);
    //     setLoading(true);
    //   } catch (error) {
    //     toast.error(`Error[Payment]: ${error}`);
    //   } finally {
    //     setLoading(false);
    //     setOpen(false);
    //     toast.success("delete successfully");
    //     router.push("/dashboard/categories");
    //   }
    // }
  }

  return (
    <>
      <BackButton text="Back" href="/dashboard/categories" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
        {initialize && (
          <>
            <Modal
              title={`Are you sure to delete?`}
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
        {/* <FormField
              control={form.control}
              name="enrollmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enroll</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={initialize?.categoryId.toString()} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a enroll" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {enrolls.map((enroll: Enroll) => (
                        <SelectItem
                          key={enroll.id}
                          value={enroll.id.toString()}
                        >
                          {"test"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
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
                <FormLabel>Date</FormLabel>
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

export default PaymentForm;
