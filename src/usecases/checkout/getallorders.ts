import { PurchaseEntity } from "../../domain/entities/purchaseEntity";
import { IPurchaseRepository } from "../../domain/interfaces/Ipurchaserepo";



export class GetAllOrders{
    constructor(
        private purchaseRep:IPurchaseRepository
    ) {
        
    }

    async execute():Promise<PurchaseEntity[]>{
        const purchases= await this.purchaseRep.getAllPurchases()
        return purchases
    }
}