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
exports.UserLoginuseCase = void 0;
const AppError_1 = require("../../../config/AppError");
const hash_1 = require("../../../config/hash");
const usermap_1 = require("../../../map/usermap");
const types_1 = require("../../../types/types");
class UserLoginuseCase {
    constructor(userrep) {
        this.userrep = userrep;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userrep.findByEmail(email);
            if (!user)
                throw new AppError_1.AppError(types_1.ErrorCodes.userNotFound, types_1.StatusCode.NOT_FOUND);
            if (!user.isActive)
                throw new AppError_1.AppError(types_1.ErrorCodes.userBlocked, types_1.StatusCode.NOT_FOUND);
            const passwordCheck = yield (0, hash_1.comparePass)(password, user.password);
            if (!passwordCheck)
                throw new AppError_1.AppError(types_1.ErrorCodes.passwordMismatch, types_1.StatusCode.NOT_FOUND);
            return (0, usermap_1.UserMap)(user);
        });
    }
}
exports.UserLoginuseCase = UserLoginuseCase;
