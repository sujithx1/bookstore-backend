"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    line: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
}, { _id: false });
const PurchaseSchema = new mongoose_1.Schema({
    purchaseId: { type: String, unique: true, required: true },
    bookId: { type: String, required: true },
    userId: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
    authorId: { type: String, required: true },
    paymentmethod: { type: String, enum: ["razorpay", 'cod'] },
    paymentstatus: { type: String, enum: ["completed", 'cancelled', 'pending'], default: 'pending' },
    orderstatus: { type: String, enum: ["completed", 'cancelled', 'pending'], default: 'pending' },
    price: { type: Number, required: true },
    address: { type: AddressSchema, required: true },
}, { timestamps: true });
exports.PurchaseModel = (0, mongoose_1.model)('Purchase', PurchaseSchema);
