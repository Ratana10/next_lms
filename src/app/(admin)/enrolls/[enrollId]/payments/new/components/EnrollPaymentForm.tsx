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
import { CalendarIcon } from "lucide-react";
import { Enroll } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import { paymentSchema } from "@/schema/definition";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { createPayment } from "@/services/payment.service";
import { ButtonLoading } from "@/components/ButtonLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EnrollPaymentProp = {
  initialize: Enroll;
};

const EnrollPaymentForm = ({ initialize }: EnrollPaymentProp) => {
  const title = "Make payment";
  const description = "Create new payment";
  const btnText = "Create";

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      enrollId: initialize.id,
      amount: 0,
      date: new Date(),
      method: "CASH",
      receiver: "",
    },
  });

  async function onSubmit(values: z.infer<typeof paymentSchema>) {
    // Create new payment
    try {
      setLoading(true);
      await createPayment(values);
      toast.success("Create successfully");
      router.push("/dashboard/enrolls");
      router.refresh();
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackButton text="Back" href="/dashboard/enrolls" />
      <div className="flex justify-between">
        <Heading title={title} descritpion={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="enrollId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EnrollId *</FormLabel>
                  <FormControl>
                    <Input disabled={true} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-between">
                    <FormLabel>Amount *</FormLabel>
                    <FormLabel className="text-md text-green-600">
                      Remain: {initialize.remain} $
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      autoFocus
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
          <div className="grid grid-cols-2 gap-8">
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
          </div>
          <div className="grid grid-cols-2 gap-8">
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
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date *</FormLabel>
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
          <ButtonLoading isLoading={loading} type="submit">
            {btnText}
          </ButtonLoading>
        </form>
      </Form>
    </>
  );
};

export default EnrollPaymentForm;
