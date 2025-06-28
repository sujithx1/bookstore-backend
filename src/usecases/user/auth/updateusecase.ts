import { AppError } from "../../../config/AppError";
import { UserEntity } from "../../../domain/entities/userEntity";
import { IUserRepository } from "../../../domain/interfaces/Iuserrep";
import { UserMap } from "../../../map/usermap";
import { ErrorCodes, StatusCode, UserMap_type, UserRole } from "../../../types/types";


export class UserUpdateuseCase  {
    constructor(private userRep:IUserRepository) {
        
    }


    async execute(id:string,name:string,mobile:string,profile:string):Promise<UserMap_type>{

        const finduser=await this.userRep.findById(id)

        if(!finduser)throw new AppError(ErrorCodes.userNotFound,StatusCode.NOT_FOUND)

          finduser.name=name
          finduser.mobile=mobile
          if (profile) {
            finduser.profile=profile
            
          }

        const update=await this.userRep.update(id,finduser)
        if(!update)throw new AppError(ErrorCodes.serverError);
        return UserMap(update)
        
    }
}