import { ObjectId } from "mongoose";
import { UserRole } from "../../types/types";


export interface Address_types{
 _id: ObjectId|string;
  name: string;
  line: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface Create_AddressType{
 
  name: string;
  line: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}
export class UserEntity {
  constructor(
    public  id:string,
    public name: string,
    public email: string,
    public role: UserRole,
    public password: string,
    public mobile:string,
    public isActive:boolean,
    public revenue:number,
    public Address?:Address_types[],
    public profile?:string,
    public createdAt?:Date,
    public updatedAt?:Date,
  ) {}
}
