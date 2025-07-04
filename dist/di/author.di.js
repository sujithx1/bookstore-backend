"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorcontroller = void 0;
const purchaserepository_1 = require("../infrastructor/repositories/purchaserepository");
const userrepository_1 = require("../infrastructor/repositories/userrepository");
const authorcontroller_1 = require("../presentation/controller/author/authorcontroller");
const authorrecentsalesusecase_1 = require("../usecases/author/authorrecentsalesusecase");
const authorsalesHistory_1 = require("../usecases/author/authorsalesHistory");
const authorStatsusecase_1 = require("../usecases/author/authorStatsusecase");
const userrep = new userrepository_1.UserRepository();
const purchaserep = new purchaserepository_1.PurchaseRepository();
const authorstatsusecase = new authorStatsusecase_1.FetchAuthorStats(purchaserep);
const authorresentsales = new authorrecentsalesusecase_1.AuthorRecentSales(purchaserep);
const authorsaleshistory = new authorsalesHistory_1.AuthorSalesHistory(purchaserep);
exports.authorcontroller = new authorcontroller_1.AuthorController(authorstatsusecase, authorresentsales, authorsaleshistory);
