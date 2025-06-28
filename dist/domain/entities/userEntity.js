"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(id, name, email, role, password, mobile, isActive, revenue, Address, profile, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.mobile = mobile;
        this.isActive = isActive;
        this.revenue = revenue;
        this.Address = Address;
        this.profile = profile;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.UserEntity = UserEntity;
