import { IPurchaseRepository } from "../../domain/interfaces/Ipurchaserepo";
import { SalesHistory_Types } from "../../types/types";

export class GetAllSalesHistoryusecase{
    constructor(
        private purchaseRep:IPurchaseRepository
    ) {
        
    }

    async execute():Promise<SalesHistory_Types[]>{
        return await this.purchaseRep.getSalesHistorybyAdmin()
        
    }
}