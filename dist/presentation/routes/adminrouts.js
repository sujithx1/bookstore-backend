"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminrouter = void 0;
const express_1 = __importDefault(require("express"));
const Authentication_1 = require("../middleware/Authentication");
const admin_di_1 = require("../../di/admin.di");
const adminrouter = express_1.default.Router();
exports.adminrouter = adminrouter;
adminrouter.get('/users', Authentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.getallusers(req, res, next);
});
adminrouter.delete('/users/:userId/:isActive', Authentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.deleteuser(req, res, next);
});
adminrouter.get('/orders', Authentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.getallorders(req, res, next);
});
adminrouter.get('/books', Authentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.getallbooks(req, res, next);
});
adminrouter.get('/sales-history', Authentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.salesHistory(req, res, next);
});
