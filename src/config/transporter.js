import nodemailer from 'nodemailer';
// import { config } from 'dotenv';
// config()
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou un autre service SMTP si nécessaire
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;