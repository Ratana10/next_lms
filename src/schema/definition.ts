import { z } from "zod";


export const loginSchema = z.object({
    username: z.string().min(1, {
      message: "Username is required.",
    }),
    password: z.string().min(2, {
      message: "Password is required.",
    }),
  });


  
export const registerSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  role: z.string({
    required_error: "Please select a role",
  }),
});


export const categorySchema = z.object({
  name: z.string().min(1, {
    message: "name is required.",
  })
});

export const teacherSchema = z.object({
  firstname: z.string().min(1, {
    message: "firstname is required.",
  }),
  lastname: z.string().min(1, {
    message: "lastname is required.",
  }),
  email: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().min(1, {
    message: "gender is required.",
  }),
  hireDate: z.date({
    required_error: "hireDate is required.",
  }),
  address: z.string().optional()
});