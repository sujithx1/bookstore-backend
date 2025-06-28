import { IUserRepository } from "../../domain/interfaces/Iuserrep";
import { UserMap } from "../../map/usermap";
import { UserMap_type } from "../../types/types";

export class GetallUsersusecase{
    constructor(
        private userep:IUserRepository
    ) {
        
    }

    async execute():Promise<UserMap_type[]>{
        const users=await this.userep.findAll()
        return users.map(UserMap)
    }
}