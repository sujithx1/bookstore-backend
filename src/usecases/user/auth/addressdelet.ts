import { AppError } from "../../../config/AppError";
import { IUserRepository } from "../../../domain/interfaces/Iuserrep";
import { ErrorCodes, StatusCode } from "../../../types/types";


export class AddressdeleteuseCase{
    constructor(
        private userrep:IUserRepository
    ) {
        
    }


    async execute(userId:string,addressId:string):Promise<boolean>{
        const deleteAddress=await this.userrep.deleteaddressbyid(userId,addressId)
        if(!deleteAddress)throw new AppError(ErrorCodes.serverError,StatusCode.INTERNAL_SERVER_ERROR)
        return true
    }
}