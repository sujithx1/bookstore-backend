import { PurchaseRepository } from "../infrastructor/repositories/purchaserepository";
import { UserRepository } from "../infrastructor/repositories/userrepository";
import { sendMonthlySummaryEmail } from "./email";

export const sendmailRevenueEachMonth = async () => {
  let userrep = new UserRepository();
  let purchaseRepo = new PurchaseRepository();
  const authors = await userrep.findallAuthors();

  const now = new Date();
  const month = now.getMonth();     
  const year = now.getFullYear();

  for (const author of authors) {
    const monthlyRevenue = await purchaseRepo.getMonthlyRevenueByAuthor(
      author.id,
      month,
      year
    );
    const yearlyRevenue = await purchaseRepo.getMonthlyRevenueByAuthor(
      author.id,
      0,
      year
    );
    const totalRevenue = await purchaseRepo.getAuthorTotalRevenue(author.id);

    await sendMonthlySummaryEmail(author.email, author.name, "AUTHOR", {
      monthlyRevenue: monthlyRevenue,
      yearlyRevenue: yearlyRevenue,
      totalRevenue: totalRevenue,
    });
  }
};
