// infrastructure/database/models/BookModel.ts
import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface BookDocument extends Document {
    _id:ObjectId
  bookId: string;
  title: string;
  description: string;
  picture:string;
  author: string;
  authorname: string;
  
  isActive:boolean
  price: number;
  sellCount: number;
  createdAt:Date,
  updatedAt:Date,
}

const BookSchema: Schema = new Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  authorname: { type: String, required: true },
  picture: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  price: { type: Number, required: true, min: 100, max: 1000 },
  sellCount: { type: Number, default: 0 },
},
{timestamps:true});

export const BookModel = mongoose.model<BookDocument>("Book", BookSchema);
