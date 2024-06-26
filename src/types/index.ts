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