"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { login } from "@/services/auth.service";
import { loginSchema } from "@/schema/definition";
import toast from "react-hot-toast";
import Toast from "@/modal/toaster";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/ButtonLoading";
export function LoginForm() {
  const [errors, setErrors] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    toast
      .promise(login(values), {
        loading: "loading",
        success: "login successfully",
        error: "Invalid username or password",
      })
      .then((message) => {
        setLoading(false);
        router.push("/");
        router.refresh();
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  function handleClearErrors() {
    setErrors(null);
  }

  return (
    <>
      <Toast />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your username and password below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem onClick={handleClearErrors}>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          autoFocus
                          autoComplete="username"
                          placeholder="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem onClick={handleClearErrors}>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="current-password"
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {errors != null ? (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Invalid</AlertTitle>
                  <AlertDescription>{errors}</AlertDescription>
                </Alert>
              ) : (
                ""
              )}
            </CardContent>
            <CardFooter>
              <ButtonLoading
                isLoading={loading}
                className="w-full"
                type="submit"
              >
                Sign in
              </ButtonLoading>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
