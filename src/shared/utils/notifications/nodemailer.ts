// Import the Nodemailer library
import nodemailer from 'nodemailer';
import { CONFIG } from 'src/shared/Config/configuration';

export interface INodemailerInfoResponse {
  accepted: string[];
  rejected: string[];
  response: string;
  envelope: {
    from: string;
    to: string[];
  };
  ehlo?: string[];
  envelopeTime?: number;
  messageTime?: number;
  messageSize?: number;
}

const transporter = nodemailer.createTransport({
  service: CONFIG.nodemailer.SERVICE,
  host: CONFIG.nodemailer.HOST,
  port: CONFIG.nodemailer.PORT,
  secure: true,
  auth: {
    user: CONFIG.nodemailer.USER,
    pass: CONFIG.nodemailer.PASS,
  },
});

const _mailOptions = (to: string, subject: string, text: string) => {
  return {
    from: CONFIG.nodemailer.FROM,
    to,
    subject,
    text,
  };
};

export const sendEmailNotification = async (to: string, subject: string, text: string) => {
  try {
    return (await transporter.sendMail(_mailOptions(to, subject, text))) as
      | INodemailerInfoResponse
      | undefined;
  } catch (error) {
    console.log(error);
  }
};
