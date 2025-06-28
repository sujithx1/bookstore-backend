import { AppError } from "../../../config/AppError";
import { comparePass } from "../../../config/hash";
import { IUserRepository } from "../../../domain/interfaces/Iuserrep";
import { UserMap } from "../../../map/usermap";
import { ErrorCodes, StatusCode, UserMap_type } from "../../../types/types";

export class UserLoginuseCase{
    constructor(
        private userrep:IUserRepository
    ) {

        
    }


    async execute(email:string,password:string):Promise<UserMap_type>{

        const user=await this.userrep.findByEmail(email)
        if(!user)throw new AppError(ErrorCodes.userNotFound,StatusCode.NOT_FOUND);
        if(!user.isActive)throw new AppError(ErrorCodes.userBlocked,StatusCode.NOT_FOUND);
        const passwordCheck=await comparePass(password,user.password)
        if(!passwordCheck)throw new AppError(ErrorCodes.passwordMismatch,StatusCode.NOT_FOUND);
        return UserMap(user)
        
        

    }
}