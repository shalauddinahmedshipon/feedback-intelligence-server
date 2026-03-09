import nodemailer from 'nodemailer';
import config from '../config'; 
export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email_user, 
      pass: config.email_pass, 
    },
  });

  await transporter.sendMail({
    from: `"Feedback System" <${config.email_user}>`,
    to,
    subject,
    html,
  });
};