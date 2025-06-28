

import { Schema, model, Document, ObjectId } from 'mongoose';
import { Address_types } from '../../domain/entities/userEntity';

export interface PurchaseDocument extends Document {
    _id:ObjectId;   
  purchaseId: string;
  bookId: string;
  userId: string;
  purchaseDate: Date;
  authorId:string;
  paymentmethod:"razorpay"|'cod';
  paymentstatus:"completed"|'cancelled'|'pending';
  orderstatus:"completed"|'cancelled'|'pending';
  price: number;
  address: Address_types;
  updatedAt:Date;
  createdAt:Date
}


const AddressSchema = new Schema<Address_types>({
  name: { type: String, required: true },
  line: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
}, { _id: false });



const PurchaseSchema = new Schema<PurchaseDocument>({
  purchaseId: { type: String, unique: true, required: true },
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
  authorId: { type: String, required:true},
  paymentmethod: { type: String, enum:["razorpay",'cod']},
  paymentstatus: { type: String, enum:["completed",'cancelled','pending'],default:'pending'},
  orderstatus: { type: String, enum:["completed",'cancelled','pending'],default:'pending'},
  
  price: { type: Number, required: true },
  address: { type: AddressSchema, required: true },
},{timestamps:true});

export const PurchaseModel = model<PurchaseDocument>('Purchase', PurchaseSchema);
