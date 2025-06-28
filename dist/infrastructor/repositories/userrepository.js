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
exports.UserRepository = void 0;
const usermodel_1 = require("../models/usermodel");
const ReturnUser = (user) => {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        revenue: user.revenue,
        Address: user.Address,
        mobile: user.mobile,
        profile: user.profile,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
class UserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield usermodel_1.UserModel.create(user);
            return ReturnUser(userData);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usermodel_1.UserModel.findOne({ email: email });
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usermodel_1.UserModel.findById(id);
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usermodel_1.UserModel.findOne({ name });
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usermodel_1.UserModel.findByIdAndUpdate(id, {
                $set: {
                    name: userData.name,
                    mobile: userData.mobile,
                    profile: userData.profile
                },
            }, { upsert: true, new: true });
            return ReturnUser(user);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield usermodel_1.UserModel.find({ role: { $nin: ["ADMIN"] } });
            return users.map((user) => ReturnUser(user));
        });
    }
    findIdBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield usermodel_1.UserModel.findByIdAndUpdate(id, { $set: { isActive: false } }, { upsert: true, new: true });
            if (!update)
                return false;
            return true;
        });
    }
    addAddress(userid, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield usermodel_1.UserModel.findByIdAndUpdate(userid, { $push: { Address: address } }, { new: true } // returns updated document
            );
            if (!updatedUser)
                return null;
            if (updatedUser.Address && updatedUser.Address.length > 0) {
                return updatedUser.Address[updatedUser.Address.length - 1];
            }
            return null;
        });
    }
    findAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield usermodel_1.UserModel.findOne({ role: "ADMIN" });
            if (!admin)
                return null;
            return ReturnUser(admin);
        });
    }
    findaddressbyid(userid, addressid) {
        return __awaiter(this, void 0, void 0, function* () {
            const useraddress = yield usermodel_1.UserModel.findById(userid);
            if (!useraddress || !useraddress.Address)
                return null;
            const foundAddress = useraddress.Address.find((addr) => addr._id.toString() === addressid);
            return foundAddress || null;
        });
    }
    findallAuthors() {
        return __awaiter(this, void 0, void 0, function* () {
            const authors = yield usermodel_1.UserModel.find({ role: "AUTHOR" });
            return authors.map(ReturnUser);
        });
    }
    deleteaddressbyid(userId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usermodel_1.UserModel.findById(userId);
            if (!user || !user.Address)
                return false;
            const index = user.Address.findIndex((addr) => addr._id.toString() === addressId);
            if (index === -1)
                return false;
            user.Address.splice(index, 1);
            yield user.save();
            return true;
        });
    }
    findIdBlockToogle(id, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usermodel_1.UserModel.findByIdAndUpdate(id, {
                $set: {
                    isActive: !isActive
                }
            }, { new: true, upsert: true });
            if (!user)
                return false;
            return true;
        });
    }
}
exports.UserRepository = UserRepository;
