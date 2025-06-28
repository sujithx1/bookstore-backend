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
exports.sendmailRevenueEachMonth = void 0;
const purchaserepository_1 = require("../infrastructor/repositories/purchaserepository");
const userrepository_1 = require("../infrastructor/repositories/userrepository");
const email_1 = require("./email");
const sendmailRevenueEachMonth = () => __awaiter(void 0, void 0, void 0, function* () {
    let userrep = new userrepository_1.UserRepository();
    let purchaseRepo = new purchaserepository_1.PurchaseRepository();
    const authors = yield userrep.findallAuthors();
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    for (const author of authors) {
        const monthlyRevenue = yield purchaseRepo.getMonthlyRevenueByAuthor(author.id, month, year);
        const yearlyRevenue = yield purchaseRepo.getMonthlyRevenueByAuthor(author.id, 0, year);
        const totalRevenue = yield purchaseRepo.getAuthorTotalRevenue(author.id);
        yield (0, email_1.sendMonthlySummaryEmail)(author.email, author.name, "AUTHOR", {
            monthlyRevenue: monthlyRevenue,
            yearlyRevenue: yearlyRevenue,
            totalRevenue: totalRevenue,
        });
    }
});
exports.sendmailRevenueEachMonth = sendmailRevenueEachMonth;
