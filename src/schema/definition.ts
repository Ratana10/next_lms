import { z } from "zod";
import { Option } from '@/components/ui/multiple-selector';


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
  })
});

export const teacherSchema = z.object({
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
  address: z.string().optional()
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
});


export const courseSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  teacherId: z.coerce.number().optional(),
  categoryId: z.coerce.number().min(1, {
    message: "Category is required.",
  }),
});

export const scheduleSchema = z.object({
  day: z.string().nullable(),
  courseId: z.coerce.number().nullable(),
  startTime: z.string(),
  endTime: z.string(),
});

export const enrollSchema = z.object({
  studentId: z.coerce.number().min(1, {
    message: "Student is required.",
  }),
  courses: z.array(z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  })).min(1, {
    message: "Course is required.",
  }),
  date: z.date({
    required_error: "Date is required.",
  }),
  amount: z.coerce.number().optional()
});

export const paymentSchema = z.object({
  enrollmentId: z.coerce.number().min(1, {
    message: "Student is required.",
  }),
  amount: z.coerce.number().min(1, {
    message: "Amount is required.",
  }),
  date: z.date({
    required_error: "Date is required.",
  }),
});

