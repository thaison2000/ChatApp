export interface UserInterface {
    userId: number,
    email: string,
    name: string,
    password: string,
    phone: string,
    address: string,
    gender: string
}

export interface UserLoginInterface {
    email: string,
    password: string,
}

export interface UserRegisterInterface {
    email: string,
    name: string,
    password: string,
    againPassword: string
}

export interface UserProfileInterface {
    email: string,
    name: string,
    dateOfBirth: string,
    phone: string,
    address: string,
    gender: string
}