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
exports.CheckoutPostuseCase = void 0;
const app_1 = require("../../app");
const AppError_1 = require("../../config/AppError");
const types_1 = require("../../types/types");
const email_1 = require("../../utils/email");
class CheckoutPostuseCase {
    constructor(checkoutrep, bookrepo, userrep) {
        this.checkoutrep = checkoutrep;
        this.bookrepo = bookrepo;
        this.userrep = userrep;
    }
    execute(bookId, price, authorId, userId, address, paymentmethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookrepo.getBookById(bookId);
            if (!book) {
                throw new AppError_1.AppError(types_1.ErrorCodes.resourceNotFound, types_1.StatusCode.NOT_FOUND);
            }
            const findauthor = yield this.userrep.findById(authorId);
            if (!findauthor) {
                throw new AppError_1.AppError(types_1.ErrorCodes.userNotFound, types_1.StatusCode.NOT_FOUND);
            }
            const findadmin = yield this.userrep.findAdmin();
            if (!findadmin) {
                throw new AppError_1.AppError(types_1.ErrorCodes.userNotFound, types_1.StatusCode.NOT_FOUND);
            }
            const finduser = yield this.userrep.findById(userId);
            if (!finduser) {
                throw new AppError_1.AppError(types_1.ErrorCodes.userNotFound, types_1.StatusCode.NOT_FOUND);
            }
            const useraddress = yield this.userrep.findaddressbyid(finduser.id, address);
            if (!useraddress)
                throw new AppError_1.AppError(types_1.ErrorCodes.userNotFound, types_1.StatusCode.NOT_FOUND);
            const data = {
                id: "",
                address: useraddress,
                authorId,
                orderstatus: 'pending',
                paymentmethod: paymentmethod,
                paymentstatus: "completed",
                bookId,
                price,
                purchaseDate: new Date(),
                purchaseId: `order-${Date.now()}`,
                userId,
            };
            const checkout = yield this.checkoutrep.createPurchase(data);
            if (!checkout)
                throw new AppError_1.AppError(types_1.ErrorCodes.serverError, types_1.StatusCode.INTERNAL_SERVER_ERROR);
            book.sellCount = (book.sellCount || 0) + 1;
            const updatebook = yield this.bookrepo.updateBook(bookId, book);
            if (!updatebook)
                throw new AppError_1.AppError(types_1.ErrorCodes.serverError, types_1.StatusCode.INTERNAL_SERVER_ERROR);
            const authorShare = price * 0.7;
            const adminShare = price - authorShare;
            findauthor.revenue = (findauthor.revenue || 0) + authorShare;
            findadmin.revenue = (findadmin.revenue || 0) + adminShare;
            yield (0, email_1.sendPurchaseEmail)(findauthor.email, book.title, book.price, finduser.name, "AUTHOR");
            yield (0, email_1.sendPurchaseEmail)(findadmin.email, book.title, book.price, finduser.name, "ADMIN");
            const message_data = {
                id: findauthor.id,
                price: price,
                book: book.title,
            };
            app_1.io.emit("purchased_message", message_data);
            return checkout;
        });
    }
}
exports.CheckoutPostuseCase = CheckoutPostuseCase;
