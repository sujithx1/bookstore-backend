import nodemailer from 'nodemailer';
import { transporter } from '../config/nodemailer';

export const sendEmail = async (to: string, subject: string, html: string) => {
 

  await transporter.sendMail({
    from: `"Bookstore" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
