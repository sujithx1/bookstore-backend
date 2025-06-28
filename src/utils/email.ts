


import { transporter } from "../config/nodemailer";
import { UserRole } from "../types/types";

export const sendPurchaseEmail = async (
  to: string,
  bookTitle: string,
  price: number,
  buyerName: string,
  type:UserRole
) => {
    let share:number=price;
    if(type=="ADMIN"){
        share=price*0.3
    }else if(type=="AUTHOR")
    {
        share=price*0.7
    }
  const mailOptions = {
    from: `"Book Store" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 New Purchase of "${bookTitle}"`,
    html: `
      <h3>New Purchase Alert</h3>
      <p><strong>${buyerName}</strong> just purchased <strong>${bookTitle}</strong>.</p>
      <p>You earned <strong>₹${share}</strong> from this sale.</p>
      <p>Login to your dashboard to see more.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};




// For monthly summary (cron job)
export const sendMonthlySummaryEmail = async (
  to: string,
  name: string,
  role: "AUTHOR" | "ADMIN",
  revenue: {
    monthlyRevenue: number;
    yearlyRevenue: number;
    totalRevenue: number;
  }
) => {
  const htmlContent = `
    <h2>📊 Monthly Revenue Summary</h2>
    <p>Hello ${name},</p>
    <p>Here's your revenue breakdown as a <strong>${role}</strong>:</p>
    <ul>
      <li>📅 <strong>Current Month:</strong> ₹${revenue.monthlyRevenue}</li>
      <li>📆 <strong>Current Year:</strong> ₹${revenue.yearlyRevenue}</li>
      <li>💰 <strong>Total Revenue:</strong> ₹${revenue.totalRevenue}</li>
    </ul>
    <p>Thank you for being part of our platform!</p>
  `;

  await transporter.sendMail({
    from: `"Book Store" <${process.env.EMAIL_USER}>`,
    to,
    subject: `📬 Your Monthly Revenue Summary`,
    html: htmlContent,
  });
};
