import { AppError } from "../../config/AppError";
import { PurchaseEntity } from "../../domain/entities/purchaseEntity";
import { IPurchaseRepository } from "../../domain/interfaces/Ipurchaserepo";
import { ErrorCodes, StatusCode } from "../../types/types";


export class OrdersgetByuserIduseCase{
    constructor(
        private purchaserep:IPurchaseRepository
    ) {
        
    }

    async execute(userId:string):Promise<PurchaseEntity[]>{
        const orders=await this.purchaserep.getPurchasesByUser(userId)
        // if(!orders)throw new AppError(ErrorCodes.ordersNotFound,StatusCode.BAD_REQUEST)
        return orders

    }
}