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
exports.UserController = void 0;
const AppError_1 = require("../../../config/AppError");
const types_1 = require("../../../types/types");
const jwt_1 = require("../../../config/jwt");
class UserController {
    constructor(loginusecase, signupusecase, userupdateusecase, addaddressusecase, finduserusecase, usergetorderbyuserIdusecase, usergetaddressbyaddressId, usergetaddressesbyuserid, userdeleteAddressbyid) {
        this.loginusecase = loginusecase;
        this.signupusecase = signupusecase;
        this.userupdateusecase = userupdateusecase;
        this.addaddressusecase = addaddressusecase;
        this.finduserusecase = finduserusecase;
        this.usergetorderbyuserIdusecase = usergetorderbyuserIdusecase;
        this.usergetaddressbyaddressId = usergetaddressbyaddressId;
        this.usergetaddressesbyuserid = usergetaddressesbyuserid;
        this.userdeleteAddressbyid = userdeleteAddressbyid;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.validationError, types_1.StatusCode.BAD_REQUEST));
                const user = yield this.loginusecase.execute(email, password);
                const accessToken = (0, jwt_1.generateAcceToken)({ id: user.id, role: user.role });
                const refreshToken = (0, jwt_1.generateRefreshToken)({
                    id: user.id,
                    role: user.role,
                });
                return res
                    .cookie(`${user.role}_refreshToken`, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                    .status(types_1.StatusCode.OK)
                    .json({
                    success: true,
                    message: "Login Success",
                    user,
                    token: accessToken,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    Signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password, mobile, role } = req.body;
                if (!email || !name || !password || !mobile || !role)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.validationError, types_1.StatusCode.BAD_REQUEST));
                const user = yield this.signupusecase.execute({
                    email,
                    name,
                    password,
                    mobile,
                    role,
                });
                return res
                    .status(types_1.StatusCode.CREATED)
                    .json({ success: true, message: "User Created", user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, mobile, profile } = req.body;
                console.log(profile);
                const { id } = req.params;
                if (!name || !mobile)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.validationError, types_1.StatusCode.BAD_REQUEST));
                const user = yield this.userupdateusecase.execute(id, name, mobile, profile);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "User updated", user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    Addaddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, line, city, state, pincode, phone } = req.body;
                const { userId } = req.params;
                if (!userId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                if (!name || !line || !city || !state || !phone || !pincode)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.validationError, types_1.StatusCode.BAD_REQUEST));
                const address = yield this.addaddressusecase.execute(userId, {
                    name,
                    city,
                    line,
                    phone,
                    pincode,
                    state,
                });
                return res
                    .status(types_1.StatusCode.CREATED)
                    .json({ success: true, message: "Address Added", address });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    // async deleteAddress(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const { index } = req.body;
    //     const { userId } = req.params;
    //     if (!index)
    //       return next(
    //         new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
    //       );
    //     if (!userId)
    //       return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));
    //   } catch (error) {
    //     return next(error);
    //   }
    // }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const user = yield this.finduserusecase.execute(id);
                const role = user.role;
                res
                    .clearCookie(`${role}_refreshToken`, {
                    httpOnly: true,
                    sameSite: "strict",
                })
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "User logout success" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getuser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.finduserusecase.execute(id);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "user", user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getordersbyuserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                if (!userId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const orders = yield this.usergetorderbyuserIdusecase.execute(userId);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "user", orders });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getaddressbyaddressid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, addressId } = req.params;
                if (!userId || !addressId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const address = yield this.usergetaddressbyaddressId.execute(userId, addressId);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "user", address });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getaddressesbyuserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                if (!userId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const addresses = yield this.usergetaddressesbyuserid.execute(userId);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "user", addresses });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    deleteuseraddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, addressId } = req.params;
                if (!userId || !addressId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const address = yield this.userdeleteAddressbyid.execute(userId, addressId);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "user", address });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.UserController = UserController;
