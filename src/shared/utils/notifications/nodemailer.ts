// Import the Nodemailer library
import nodemailer from 'nodemailer';

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

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'estani.pettigrew@gmail.com',
        pass: 'dsnq yxgw jxbv ibtu',
    },
});

// Email data
const _mailOptions = (to: string, subject: string, text: string) => {
    return {
        from: 'estani.pettigrew@gmail.com',
        to,
        subject,
        text,
    };
};

// Send the email
export const sendEmailNotification = async (to: string, subject: string, text: string) => {
    try {
        return (await transporter.sendMail(_mailOptions(to, subject, text))) as
            | INodemailerInfoResponse
            | undefined;
    } catch (error) {
        console.log(error);
    }
};
