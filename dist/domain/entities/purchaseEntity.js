"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseEntity = void 0;
class PurchaseEntity {
    constructor(id, purchaseId, bookId, userId, paymentmethod, paymentstatus, orderstatus, authorId, purchaseDate, price, address) {
        this.id = id;
        this.purchaseId = purchaseId;
        this.bookId = bookId;
        this.userId = userId;
        this.paymentmethod = paymentmethod;
        this.paymentstatus = paymentstatus;
        this.orderstatus = orderstatus;
        this.authorId = authorId;
        this.purchaseDate = purchaseDate;
        this.price = price;
        this.address = address;
    }
}
exports.PurchaseEntity = PurchaseEntity;
