import { UserRole } from "../enums/user.role";

export interface IAuthData {
    password:string,
    email:string,
    role:UserRole
}

export interface IPostData {
    title:string,
    body:string
}