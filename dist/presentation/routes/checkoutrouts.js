"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutrouter = void 0;
const express_1 = __importDefault(require("express"));
const checkout_di_1 = require("../../di/checkout.di");
const Authentication_1 = require("../middleware/Authentication");
const checkoutrouter = express_1.default.Router();
exports.checkoutrouter = checkoutrouter;
checkoutrouter.post('/', Authentication_1.Authentication, (req, res, next) => {
    checkout_di_1.checkoutcontroller.checkoutpost(req, res, next);
});
checkoutrouter.post('/order', Authentication_1.Authentication, (req, res, next) => {
    checkout_di_1.checkoutcontroller.create_orderRazorpay(req, res, next);
});
