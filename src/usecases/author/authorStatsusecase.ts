import { IPurchaseRepository } from "../../domain/interfaces/Ipurchaserepo";
import { AuthorStats } from "../../types/types";



export class FetchAuthorStats{
    constructor(
        private purchaserep:IPurchaseRepository
    ) {
        
    }


    async execute(authorId:string):Promise<AuthorStats>{
        return await this.purchaserep.getAuthorStats(authorId)

    }

    
}