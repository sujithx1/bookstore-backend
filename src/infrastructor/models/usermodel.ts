import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { UserRole } from "../../types/types";
import { Address_types } from "../../domain/entities/userEntity";

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: UserRole;
  isActive: boolean;

  revenue: number;
  profile?: string;
  Address?: Address_types[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<Address_types>({
  name: { type: String, required: true },
  line: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    Address: {
      type: [AddressSchema],
      default: [],
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "AUTHOR"],
      default: "USER",
    },
    profile: {
      type: String,
      default: "",
    },
    revenue: {
      type: Number,
      default: 0,
      required: function () {
        return this.role === "AUTHOR" || this.role === "ADMIN";
      },
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
