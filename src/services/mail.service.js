import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: Number(config.MAIL_PORT) === 465, // true for 465, false for others
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Ecommerce" <${config.MAIL_USER}>`,
      to,
      subject,
      html
    });
  } catch (err) {
    console.error('Error sending mail:', err);
    throw err;
  }
};
