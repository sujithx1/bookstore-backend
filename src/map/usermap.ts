import { UserEntity } from "../domain/entities/userEntity"
import { UserMap_type } from "../types/types"



export const UserMap=(user:UserEntity):UserMap_type=>{
    return{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        mobile:user.mobile,
        profile:user.profile,
        isActive:user.isActive,
        Address:user.Address,
        revenue:user.revenue,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt
    }
}

