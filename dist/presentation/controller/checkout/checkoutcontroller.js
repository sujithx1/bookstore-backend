"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkoutcontrolle = void 0;
const AppError_1 = require("../../../config/AppError");
const types_1 = require("../../../types/types");
const razorpay_1 = require("../../../config/razorpay");
class Checkoutcontrolle {
    constructor(checkoutusecase) {
        this.checkoutusecase = checkoutusecase;
    }
    checkoutpost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookId, userId, authorId, price, address, paymentmethod } = req.body;
                console.log(bookId, userId, address, authorId, price, paymentmethod);
                if (!bookId || !userId || !authorId || !price || !address || !paymentmethod) {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.validationError, types_1.StatusCode.BAD_REQUEST));
                }
                const checkout = yield this.checkoutusecase.execute(bookId, parseFloat(price), authorId, userId, address, paymentmethod);
                return res
                    .status(types_1.StatusCode.CREATED)
                    .json({ success: true, message: "Created", checkout });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    create_orderRazorpay(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, currency = "INR", receipt } = req.body;
                const options = {
                    amount: amount * 100, // amount in paisa
                    currency,
                    receipt: receipt || `rcpt-${Date.now()}`,
                };
                const order = yield razorpay_1.razorpay.orders.create(options);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "razorpay", order });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.Checkoutcontrolle = Checkoutcontrolle;
