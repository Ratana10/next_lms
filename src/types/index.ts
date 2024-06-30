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

export type Pagination={
    pageSize: number,
    pageNumber: number,
    totalPages: number,
    numberOfElements: number,
    totalElements: number,
    first: boolean,
    last: boolean,
    empty: boolean
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