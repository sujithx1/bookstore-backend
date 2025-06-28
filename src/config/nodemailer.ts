import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.PASSWORD, // app password (not your Gmail password)
  }, 
});



