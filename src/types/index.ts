export type LoginRequest = {
    username: string,
    password: string
}


export type RegisterRequest = {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    role: string,
}

export type Category ={
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
}

export type Teacher = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    hireDate: Date,
    phone: string,
    address: string,
    createdAt: string,
    updatedAt: string,
}


export type Student = {
    id: number,
    firstname: string,
    lastname: string,
    gender: string,
    email: string;
    phone: string,
    createdAt: string,
    updatedAt: string,
}

export type Course = {
    id: number,
    name: string,
    description: string,
    price: number,
    categoryId: number;
    teacherId: number;
    createdAt: string,
    updatedAt: string,
    teacher?: Teacher
}

export type Schedule = {
    id: number,
    courseId: number;
    day: string;
    startTime: string,
    endTime: string,
    createdAt: string,
    updatedAt: string,
    course: Course | null
}

export type Enroll = {
    id: number,
    studentId: number;
    courseIds: number[];
    total: number,
    remain: number,
    status: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    student?: Student
    courses?: Course[]
}

export type Payment = {
    id: number,
    amount: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    enrollment?: Enroll,
}


export type Account = {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    role: string,
    createdAt: string,
    updatedAt: string,
}

export type AttendanceData= {
    PRESENT: number[],
    ABSENT: number[],
    PERMISSION: number[],
}

export type AttendanceRequest= {
    courseId: number,
    date: Date | undefined,
    attendance: AttendanceData,
}

export type AttendanceDetail = {
    id: number,
    student: Student,
    status: string,
}

export type Attendance = {
    course?: Course,
    date: Date | undefined,
    attendantDetail?: AttendanceDetail
}