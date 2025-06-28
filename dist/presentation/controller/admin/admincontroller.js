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
exports.AdminController = void 0;
const types_1 = require("../../../types/types");
const AppError_1 = require("../../../config/AppError");
class AdminController {
    constructor(getusersusecase, deleteuserusecase, getallordersusecase, getallbooksusecase, getallsalesHistoriesusecase) {
        this.getusersusecase = getusersusecase;
        this.deleteuserusecase = deleteuserusecase;
        this.getallordersusecase = getallordersusecase;
        this.getallbooksusecase = getallbooksusecase;
        this.getallsalesHistoriesusecase = getallsalesHistoriesusecase;
    }
    getallusers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getusersusecase.execute();
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "useres", users });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    deleteuser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, isActive } = req.params;
                if (!userId || !isActive) {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.validationError, types_1.StatusCode.BAD_REQUEST));
                }
                const users = yield this.deleteuserusecase.execute(userId, isActive);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "useres", users });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getallorders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.getallordersusecase.execute();
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "useres", orders });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getallbooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.getallbooksusecase.execute();
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "useres", books });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    salesHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield this.getallsalesHistoriesusecase.execute();
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "useres", sales });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.AdminController = AdminController;
