"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const UserMap = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        profile: user.profile,
        isActive: user.isActive,
        Address: user.Address,
        revenue: user.revenue,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};
exports.UserMap = UserMap;
