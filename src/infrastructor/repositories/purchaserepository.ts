import { PurchaseEntity } from "../../domain/entities/purchaseEntity";
import { IPurchaseRepository } from "../../domain/interfaces/Ipurchaserepo";
import { AuthorStats, RecentSales_Types, SaleRecordType, SalesHistory_Types } from "../../types/types";
import { BookModel } from "../models/bookmodel";
import { PurchaseDocument, PurchaseModel } from "../models/purchasemodel";
import { UserModel } from "../models/usermodel";

export class PurchaseRepository implements IPurchaseRepository {
  async createPurchase(purchase: PurchaseEntity): Promise<PurchaseEntity> {
    const createdPurchase = await PurchaseModel.create(purchase);
    return this.toEntity(createdPurchase);
  }

  async getPurchaseById(purchaseId: string): Promise<PurchaseEntity | null> {
    const purchase = await PurchaseModel.findOne({ purchaseId });
    return purchase ? this.toEntity(purchase) : null;
  }

  async getPurchasesByUser(userId: string): Promise<PurchaseEntity[]> {
    const purchases = await PurchaseModel.find({ userId });
    return purchases.map(this.toEntity);
  }

  async getAllPurchases(): Promise<PurchaseEntity[]> {
    const purchases = await PurchaseModel.find();
    return purchases.map(this.toEntity);
  }

  async getPurchasesByBook(bookId: string): Promise<PurchaseEntity[]> {
    const purchases = await PurchaseModel.find({ bookId });
    return purchases.map(this.toEntity);
  }

  async getMonthlyRevenueByAuthor(authorId: string, month: number, year: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const purchases = await PurchaseModel.find({
      purchaseDate: { $gte: startDate, $lt: endDate },
      authorId: authorId,
    });

    return purchases.reduce((total, purchase) => {
      return total + purchase.price;
    }, 0);
  }


  async getAuthorTotalRevenue(authorId: string): Promise<number> {
  const purchases = await PurchaseModel.aggregate([
    { $match: { authorId } },
    { $group: { _id: null, total: { $sum: "$price" } } }
  ]);
  return purchases[0]?.total || 0;
}
async getAuthorStats(authorId: string): Promise<AuthorStats> {
    const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const purchases = await PurchaseModel.find({ authorId });

  const totalRevenue = purchases.reduce((acc, p) => acc + (p.price || 0), 0);
  const monthlyRevenue = purchases
    .filter(p => new Date(p.purchaseDate) >= monthStart)
    .reduce((acc, p) => acc + (p.price || 0), 0);

  const totalSales = purchases.length;
  const totalBooks = await BookModel.countDocuments({ author: authorId });

  return {
    totalRevenue,
    monthlyRevenue,
    totalBooks,
    totalSales
  };
}

async getRecentSalesByAuthor(authorId: string): Promise<RecentSales_Types[]> {
        const sales = await PurchaseModel.find({ authorId })
      .sort({ purchaseDate: -1 }) 
      .limit(5)

const recentSales: RecentSales_Types[] = await Promise.all(
  sales.map(async (purchase) => {
    const book = await BookModel.findById(purchase.bookId).select('id title').lean();

    return {
      id: purchase._id.toString(), // ✅ Add this
      purchaseId: purchase.purchaseId,
      userId: purchase.userId,
      authorId: purchase.authorId,
      paymentmethod: purchase.paymentmethod,
      paymentstatus: purchase.paymentstatus,
      orderstatus: purchase.orderstatus,
      purchaseDate: purchase.purchaseDate,
      price: purchase.price,
      address: purchase.address,
      bookId: {
        bookid: purchase.bookId,
        titile: book?.title || 'Unknown Title',
      },
    };
  })
);
return recentSales

    
      
}


async getSalesHistoryByAuthor(authorId: string): Promise<RecentSales_Types[]> {
   const sales = await PurchaseModel.find({ authorId })
    
const recentSales: RecentSales_Types[] = await Promise.all(
  sales.map(async (purchase) => {
    const book = await BookModel.findById(purchase.bookId).select('id title').lean();

    return {
      id: purchase._id.toString(), 
      purchaseId: purchase.purchaseId,
      userId: purchase.userId,
      authorId: purchase.authorId,
      paymentmethod: purchase.paymentmethod,
      paymentstatus: purchase.paymentstatus,
      orderstatus: purchase.orderstatus,
      purchaseDate: purchase.purchaseDate,
      price: purchase.price,
      address: purchase.address,
      bookId: {
        bookid: purchase.bookId,
        titile: book?.title || 'Unknown Title',
      },
    };
  })
);
return recentSales
   
    
}

async getSalesHistorybyAdmin(): Promise<SalesHistory_Types[]> {
  const sales = await PurchaseModel.find()
    
const recentSales: SalesHistory_Types[] = await Promise.all(
  sales.map(async (purchase) => {
    const book = await BookModel.findById(purchase.bookId).select('id title').lean();
    const user=await UserModel.findById(purchase.userId).select('id name email').lean()
    const author =await UserModel.findById(purchase.authorId).select('id name').lean()

    return {
      id: purchase._id.toString(), 
      purchaseId: purchase.purchaseId,
      userId: {
        userId:purchase.userId,
        name:user?.name||"Unknown Name",
        email:user?.email||"Unknown Email"

      },
      authorId:{
         authorId:purchase.authorId,
         authorName:author?.name||"Unknown Name"

      },
      paymentmethod: purchase.paymentmethod,
      paymentstatus: purchase.paymentstatus,
      orderstatus: purchase.orderstatus,
      purchaseDate: purchase.purchaseDate,
      price: purchase.price,
      address: purchase.address,
      bookId: {
        bookid: purchase.bookId,
        titile: book?.title || 'Unknown Title',
      },
    };
  })
);
return recentSales
    
}




  private toEntity(purchase:PurchaseDocument ): PurchaseEntity {
    return {
      id: purchase._id.toString(),
      purchaseId: purchase.purchaseId,
      orderstatus:purchase.orderstatus,
      paymentmethod:purchase.paymentmethod,
      paymentstatus:purchase.paymentstatus,
      userId: purchase.userId,
      bookId: purchase.bookId,
      authorId: purchase.authorId,
      purchaseDate: purchase.purchaseDate,
      address: purchase.address,
      price: purchase.price,
    };
  }
}
