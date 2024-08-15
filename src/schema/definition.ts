import { z } from "zod";
import { Option } from "@/components/ui/multiple-selector";

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
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
});

export const teacherSchema = z.object({
  code: z.string().min(1, {
    message: "Code is required.",
  }),
  firstname: z.string().min(1, {
    message: "Firstname is required.",
  }),
  lastname: z.string().min(1, {
    message: "Lastname is required.",
  }),
  email: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
  hireDate: z.date({
    required_error: "HireDate is required.",
  }),
  address: z.string().optional(),
});

export const studentSchema = z.object({
  firstname: z.string().min(1, {
    message: "Firstname is required.",
  }),
  lastname: z.string().min(1, {
    message: "Lastname is required.",
  }),
  phone: z.string().optional(),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
  email: z.string().optional(),
  type: z.string().optional(),
  position: z.string().optional(),
  from: z.string().optional(),
});

export const courseSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().optional(),
  price: z.coerce.number().min(1, {
    message: "Price is required.",
  }),
  discount: z.coerce.number().min(1, {
    message: "Discount is required.",
  }),
  teacherId: z.coerce.number().min(1, {
    message: "Teacher is required.",
  }),
  categoryId: z.coerce.number().min(1, {
    message: "Category is required.",
  }),
});

export const scheduleSchema = z.object({
  description: z.string().min(1, {
    message: "Day is required.",
  }),
  courseId: z.coerce.number().min(1, {
    message: "Course is required.",
  }),
  startTime: z.string().min(1, {
    message: "StartTime is required.",
  }),
  endTime: z.string().min(1, {
    message: "EndTime is required.",
  }),
  startDate: z.date({
    required_error: "startDate is required.",
  }),
  endDate: z.date({
    required_error: "endDate is required.",
  }),
  totalTime: z.coerce.number().optional(),
});

export const enrollSchema = z.object({
  studentId: z.coerce.number().min(1, {
    message: "Student is required.",
  }),
  courses: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(1, {
      message: "Course is required.",
    }),
  date: z.date({
    required_error: "Date is required.",
  }),
  amount: z.coerce.number().optional(),
  method: z.coerce.string().optional(),
  receiver: z.coerce.string().optional(),
});

export const enrollV2Schema = z.object({
  studentId: z.coerce.number().min(1, {
    message: "Student is required.",
  }),
  courseId: z.coerce.number().min(1, {
    message: "Course is required.",
  }),
  date: z.date({
    required_error: "Date is required.",
  }),
  amount: z.coerce.number().optional(),
  method: z.coerce.string().optional(),
  receiver: z.coerce.string().optional(),
});

export const paymentSchema = z.object({
  enrollId: z.coerce.number().min(1, {
    message: "Enroll is required.",
  }),
  amount: z.coerce.number().min(1, {
    message: "Amount is required.",
  }),
  date: z.date({
    required_error: "Date is required.",
  }),
  method: z.coerce.string().optional(),
  receiver: z.coerce.string().optional(),
});
