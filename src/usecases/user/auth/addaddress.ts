import { AppError } from "../../../config/AppError";
import { Address_types, Create_AddressType } from "../../../domain/entities/userEntity";
import { IUserRepository } from "../../../domain/interfaces/Iuserrep";
import { ErrorCodes, StatusCode } from "../../../types/types";

export class UserAddAddressuseCase{
    constructor(
        private userrep:IUserRepository
    ) {
        
    }


    async execute(userId:string,address:Create_AddressType):Promise<Address_types>{

        const user=await this.userrep.findById(userId)
        if(!user)throw new AppError(ErrorCodes.userNotFound,StatusCode.NOT_FOUND);
        const updateaddress=await this.userrep.addAddress(user.id,address)
        if(!updateaddress)throw new AppError(ErrorCodes.serverError,StatusCode.INTERNAL_SERVER_ERROR);
        
        return updateaddress
        
        

    }
}

