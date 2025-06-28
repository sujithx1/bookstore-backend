import { IUserRepository } from "../../../domain/interfaces/Iuserrep";
import { Address_types } from "../../../domain/entities/userEntity";
import { AppError } from "../../../config/AppError";
import { ErrorCodes, StatusCode } from "../../../types/types";


export class UserGetAddressByuserId{
    constructor(
        private userrep:IUserRepository
    ){}

    async execute(userid:string):Promise<Address_types[]|[]>{
        const user=await this.userrep.findById(userid)
        if(!user)throw  new AppError(ErrorCodes.userNotFound,StatusCode.NOT_FOUND)

       return user.Address?user.Address:[]
    }

} 