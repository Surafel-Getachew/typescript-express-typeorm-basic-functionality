import { User } from "../models/entity/User";

export interface ICreatePostData {
    title:string,
    body:string
    user:User
}

export interface None {
    
}