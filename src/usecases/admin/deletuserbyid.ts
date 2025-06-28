import { AppError } from "../../config/AppError";
import { IUserRepository } from "../../domain/interfaces/Iuserrep";
import { ErrorCodes, StatusCode } from "../../types/types";


export class ToogleuserActiveuseCase{
    constructor(
        private userrep:IUserRepository
    ) {
        
    }

    async execute(userid:string,isActive:string):Promise<boolean>{

const user=await this.userrep.findById(userid)
if(!user)throw new AppError(ErrorCodes.userNotFound,StatusCode.NOT_FOUND)

     const active=isActive==="true"
     console.log(active);
     
      const update=await this.userrep.findIdBlockToogle(userid,active)
        if(!update)throw new AppError(ErrorCodes.serverError,StatusCode.INTERNAL_SERVER_ERROR)
        
        return true

    }
}