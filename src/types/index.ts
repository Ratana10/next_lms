export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  role: string;
};

export type Dashbord = {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
};

export type Category = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Teacher = {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  hireDate: Date;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type Student = {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  phone: string;
  type?: string;
  position?: string;
  from?: string;
  createdAt: string;
  updatedAt: string;
};

export type Course = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  categoryId: number;
  teacherId: number | undefined;
  createdAt: string;
  updatedAt: string;
  teacher?: Teacher;
};

export type Schedule = {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  totalTime: number;
  createdAt: string;
  updatedAt: string;
  courseId: number | undefined;
  course: Course;
};

export type Enroll = {
  id: number;
  studentId: number;
  courseIds: number[];
  total: number;
  remain: number;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  courses?: Course[];
};

export type EnrollV2 = {
  id: number;
  studentId: number;
  courseId: number;
  price: number;
  remain: number;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  course?: Course;
};

export type Payment = {
  id: number;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  enroll?: EnrollV2;
  method?: string;
  receiver?: string;
};

export type Account = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type AttendanceData = {
  PRESENT: number[];
  ABSENT: number[];
  PERMISSION: number[];
};

export type AttendanceRequest = {
  courseId: number;
  date: Date | undefined;
  attendance: AttendanceData;
};

export type AttendanceDetail = {
  id: number;
  student: Student;
  status: string;
  date: string;
  reason?: string;
};

export type Attendance = {
  id: number;
  courseName: string;
  date: string;
  attendanceDetails: AttendanceDetail[];
};
