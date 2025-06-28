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
exports.PurchaseRepository = void 0;
const bookmodel_1 = require("../models/bookmodel");
const purchasemodel_1 = require("../models/purchasemodel");
const usermodel_1 = require("../models/usermodel");
class PurchaseRepository {
    createPurchase(purchase) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPurchase = yield purchasemodel_1.PurchaseModel.create(purchase);
            return this.toEntity(createdPurchase);
        });
    }
    getPurchaseById(purchaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchase = yield purchasemodel_1.PurchaseModel.findOne({ purchaseId });
            return purchase ? this.toEntity(purchase) : null;
        });
    }
    getPurchasesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchases = yield purchasemodel_1.PurchaseModel.find({ userId });
            return purchases.map(this.toEntity);
        });
    }
    getAllPurchases() {
        return __awaiter(this, void 0, void 0, function* () {
            const purchases = yield purchasemodel_1.PurchaseModel.find();
            return purchases.map(this.toEntity);
        });
    }
    getPurchasesByBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchases = yield purchasemodel_1.PurchaseModel.find({ bookId });
            return purchases.map(this.toEntity);
        });
    }
    getMonthlyRevenueByAuthor(authorId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);
            const purchases = yield purchasemodel_1.PurchaseModel.find({
                purchaseDate: { $gte: startDate, $lt: endDate },
                authorId: authorId,
            });
            return purchases.reduce((total, purchase) => {
                return total + purchase.price;
            }, 0);
        });
    }
    getAuthorTotalRevenue(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const purchases = yield purchasemodel_1.PurchaseModel.aggregate([
                { $match: { authorId } },
                { $group: { _id: null, total: { $sum: "$price" } } }
            ]);
            return ((_a = purchases[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        });
    }
    getAuthorStats(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const purchases = yield purchasemodel_1.PurchaseModel.find({ authorId });
            const totalRevenue = purchases.reduce((acc, p) => acc + (p.price || 0), 0);
            const monthlyRevenue = purchases
                .filter(p => new Date(p.purchaseDate) >= monthStart)
                .reduce((acc, p) => acc + (p.price || 0), 0);
            const totalSales = purchases.length;
            const totalBooks = yield bookmodel_1.BookModel.countDocuments({ author: authorId });
            return {
                totalRevenue,
                monthlyRevenue,
                totalBooks,
                totalSales
            };
        });
    }
    getRecentSalesByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield purchasemodel_1.PurchaseModel.find({ authorId })
                .sort({ purchaseDate: -1 })
                .limit(5);
            const recentSales = yield Promise.all(sales.map((purchase) => __awaiter(this, void 0, void 0, function* () {
                const book = yield bookmodel_1.BookModel.findById(purchase.bookId).select('id title').lean();
                return {
                    id: purchase._id.toString(), // ✅ Add this
                    purchaseId: purchase.purchaseId,
                    userId: purchase.userId,
                    authorId: purchase.authorId,
                    paymentmethod: purchase.paymentmethod,
                    paymentstatus: purchase.paymentstatus,
                    orderstatus: purchase.orderstatus,
                    purchaseDate: purchase.purchaseDate,
                    price: purchase.price,
                    address: purchase.address,
                    bookId: {
                        bookid: purchase.bookId,
                        titile: (book === null || book === void 0 ? void 0 : book.title) || 'Unknown Title',
                    },
                };
            })));
            return recentSales;
        });
    }
    getSalesHistoryByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield purchasemodel_1.PurchaseModel.find({ authorId });
            const recentSales = yield Promise.all(sales.map((purchase) => __awaiter(this, void 0, void 0, function* () {
                const book = yield bookmodel_1.BookModel.findById(purchase.bookId).select('id title').lean();
                return {
                    id: purchase._id.toString(),
                    purchaseId: purchase.purchaseId,
                    userId: purchase.userId,
                    authorId: purchase.authorId,
                    paymentmethod: purchase.paymentmethod,
                    paymentstatus: purchase.paymentstatus,
                    orderstatus: purchase.orderstatus,
                    purchaseDate: purchase.purchaseDate,
                    price: purchase.price,
                    address: purchase.address,
                    bookId: {
                        bookid: purchase.bookId,
                        titile: (book === null || book === void 0 ? void 0 : book.title) || 'Unknown Title',
                    },
                };
            })));
            return recentSales;
        });
    }
    getSalesHistorybyAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield purchasemodel_1.PurchaseModel.find();
            const recentSales = yield Promise.all(sales.map((purchase) => __awaiter(this, void 0, void 0, function* () {
                const book = yield bookmodel_1.BookModel.findById(purchase.bookId).select('id title').lean();
                const user = yield usermodel_1.UserModel.findById(purchase.userId).select('id name email').lean();
                const author = yield usermodel_1.UserModel.findById(purchase.authorId).select('id name').lean();
                return {
                    id: purchase._id.toString(),
                    purchaseId: purchase.purchaseId,
                    userId: {
                        userId: purchase.userId,
                        name: (user === null || user === void 0 ? void 0 : user.name) || "Unknown Name",
                        email: (user === null || user === void 0 ? void 0 : user.email) || "Unknown Email"
                    },
                    authorId: {
                        authorId: purchase.authorId,
                        authorName: (author === null || author === void 0 ? void 0 : author.name) || "Unknown Name"
                    },
                    paymentmethod: purchase.paymentmethod,
                    paymentstatus: purchase.paymentstatus,
                    orderstatus: purchase.orderstatus,
                    purchaseDate: purchase.purchaseDate,
                    price: purchase.price,
                    address: purchase.address,
                    bookId: {
                        bookid: purchase.bookId,
                        titile: (book === null || book === void 0 ? void 0 : book.title) || 'Unknown Title',
                    },
                };
            })));
            return recentSales;
        });
    }
    toEntity(purchase) {
        return {
            id: purchase._id.toString(),
            purchaseId: purchase.purchaseId,
            orderstatus: purchase.orderstatus,
            paymentmethod: purchase.paymentmethod,
            paymentstatus: purchase.paymentstatus,
            userId: purchase.userId,
            bookId: purchase.bookId,
            authorId: purchase.authorId,
            purchaseDate: purchase.purchaseDate,
            address: purchase.address,
            price: purchase.price,
        };
    }
}
exports.PurchaseRepository = PurchaseRepository;
