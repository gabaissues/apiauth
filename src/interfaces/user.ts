export interface IUser {
    name: string,
    email: string,
    password: string,
    id?: string
}

export interface ILogin {
    email: string,
    password: string
}