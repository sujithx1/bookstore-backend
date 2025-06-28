import { AppError } from "../../../config/AppError"
import { IUserRepository } from "../../../domain/interfaces/Iuserrep"
import { UserMap } from "../../../map/usermap"
import { ErrorCodes, StatusCode, UserMap_type } from "../../../types/types"



export class FindUser{
    constructor(
        private userrep:IUserRepository
    ) {
        
    }


    async execute(id:string):Promise<UserMap_type>{
        const user=await this.userrep.findById(id)
        if(!user)throw new AppError(ErrorCodes.userNotFound,StatusCode.NOT_FOUND)
        return UserMap(user)
    }
}