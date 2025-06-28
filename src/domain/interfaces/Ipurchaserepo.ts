import { AuthorStats, RecentSales_Types, SaleRecordType, SalesHistory_Types } from "../../types/types";
import { PurchaseEntity } from "../entities/purchaseEntity";

export interface IPurchaseRepository {
  createPurchase(purchase: PurchaseEntity): Promise<PurchaseEntity>;
  getPurchaseById(purchaseId: string): Promise<PurchaseEntity | null>;
  getPurchasesByUser(userId: string): Promise<PurchaseEntity[]>;
  getAllPurchases(): Promise<PurchaseEntity[]>;
  getPurchasesByBook(bookId: string): Promise<PurchaseEntity[]>;
  getAuthorTotalRevenue(authorId:string): Promise<number>;
  getMonthlyRevenueByAuthor(authorId: string, month: number, year: number): Promise<number>;
  getAuthorStats(authorId:string):Promise<AuthorStats>
  getRecentSalesByAuthor(authorId:string):Promise<RecentSales_Types[]>
  getSalesHistoryByAuthor(authorId:string):Promise<RecentSales_Types[]>
  getSalesHistorybyAdmin():Promise<SalesHistory_Types[]>


}
