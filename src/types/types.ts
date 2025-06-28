import { Address_types } from "../domain/entities/userEntity";

export type UserRole = "ADMIN" | "AUTHOR" | "USER";

export interface jwt_Params {
  id: string;
  role: UserRole;
}



export interface SalesHistory_Types {
  id: string;
  purchaseId: string;
  bookId: {
    bookid: string;
    titile: string;
  };
  userId: {
    userId:string;
    name:string,
    email:string
  };
  paymentmethod: "razorpay" | "cod";
  paymentstatus: "completed" | "cancelled" | "pending";
  orderstatus: "completed" | "cancelled" | "pending";
  authorId: {
    authorId:string,
    authorName:string
  };
  purchaseDate: Date;
  price: number;
  address: Address_types;
}



export const ErrorCodes = {
  serverError: 'An unexpected error occurred on the server.',
  userBlocked: 'User is Blocked.',
  passwordMismatch: 'The provided passwords do not match.',
  userNotFound: 'The requested user could not be found.',
  resourceNotFound: 'The requested resource was not found.',
  bookNotFound: 'The requested Book was not found.',
  addressNotFound: 'The requested Book was not found.',
  ordersNotFound: 'The requested orders was not found.',
  validationError: 'Validation failed. Please check the input fields.',
  missingId: 'A required ID is missing.',
  emailAlreadyExists: 'An account with this email already exists.',
  usernameAlreadyExists: 'This username is already taken.'
} as const;




export interface AuthorStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalBooks: number;
  totalSales: number;
}

export type SaleRecordType = {
  date: string;
  picture:string;
  title: string;
  revenue: number;
  orderId: string;
};  


export interface RecentSales_Types {
   id: string,
     purchaseId: string,
     bookId: {
      bookid:string,
      titile:string
     },
     userId: string,
     paymentmethod: 'razorpay'|'cod',
     paymentstatus: 'completed'|'cancelled' | 'pending',
     orderstatus: 'completed'|'cancelled' | 'pending',
     authorId:string,
     purchaseDate: Date,
     price: number,
     address: Address_types,
}
export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}



export interface UserCreate_types{
  name:string,
  email:string,
  password:string,
  role:UserRole,
  mobile:string
}


export interface UserMap_type{
       readonly id:string,
       profile?:string;
       name: string,
       email: string,
       role: UserRole,
       isActive:boolean,
       mobile:string,
       revenue?:number
       Address?:Address_types[],
       createdAt?:Date,
       updatedAt?:Date,

}
