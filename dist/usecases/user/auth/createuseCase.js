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
exports.UserCreateuseCase = void 0;
const AppError_1 = require("../../../config/AppError");
const hash_1 = require("../../../config/hash");
const usermap_1 = require("../../../map/usermap");
const types_1 = require("../../../types/types");
class UserCreateuseCase {
    constructor(userrep) {
        this.userrep = userrep;
    }
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const findemail = yield this.userrep.findByEmail(userData.email);
            if (findemail)
                throw new AppError_1.AppError(types_1.ErrorCodes.emailAlreadyExists, types_1.StatusCode.BAD_REQUEST);
            const hash = yield (0, hash_1.hashfn)(userData.password);
            const newUser = Object.assign(Object.assign({ id: "" }, userData), { password: hash, revenue: 0, isActive: true });
            return (0, usermap_1.UserMap)(yield this.userrep.create(newUser));
        });
    }
}
exports.UserCreateuseCase = UserCreateuseCase;
