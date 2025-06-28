import { Address_types } from "./userEntity";

export class PurchaseEntity {
  constructor(
    public id: string,
    public purchaseId: string,
    public bookId: string,
    public userId: string,
    public paymentmethod: 'razorpay'|'cod',
    public paymentstatus: 'completed'|'cancelled' | 'pending',
    public orderstatus: 'completed'|'cancelled' | 'pending',
    public authorId:string,
    public purchaseDate: Date,
    public price: number,
    public address: Address_types,
  ) {}
}



