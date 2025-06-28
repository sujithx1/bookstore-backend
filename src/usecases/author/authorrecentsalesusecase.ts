import { PurchaseEntity } from "../../domain/entities/purchaseEntity";
import { IPurchaseRepository } from "../../domain/interfaces/Ipurchaserepo";
import { RecentSales_Types } from "../../types/types";


export class AuthorRecentSales{
    constructor(
        private purchaserep:IPurchaseRepository

    ) {
        
    }

    async execute(authorId:string):Promise<RecentSales_Types[]>{

        return await this.purchaserep.getRecentSalesByAuthor(authorId)

        

    }
}