"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMonthlySummaryEmail = exports.sendPurchaseEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
const sendPurchaseEmail = (to, bookTitle, price, buyerName, type) => __awaiter(void 0, void 0, void 0, function* () {
    let share = price;
    if (type == "ADMIN") {
        share = price * 0.3;
    }
    else if (type == "AUTHOR") {
        share = price * 0.7;
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
    yield nodemailer_1.transporter.sendMail(mailOptions);
});
exports.sendPurchaseEmail = sendPurchaseEmail;
// For monthly summary (cron job)
const sendMonthlySummaryEmail = (to, name, role, revenue) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield nodemailer_1.transporter.sendMail({
        from: `"Book Store" <${process.env.EMAIL_USER}>`,
        to,
        subject: `📬 Your Monthly Revenue Summary`,
        html: htmlContent,
    });
});
exports.sendMonthlySummaryEmail = sendMonthlySummaryEmail;
