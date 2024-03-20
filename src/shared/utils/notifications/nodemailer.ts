// Import the Nodemailer library
import nodemailer from 'nodemailer';
import { nodemailerProps } from 'src/shared/Config/configuration';

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
    service: nodemailerProps.SERVICE,
    host: nodemailerProps.HOST,
    port: Number(nodemailerProps.PORT),
    secure: true,
    auth: {
        user: nodemailerProps.USER,
        pass: nodemailerProps.PASS,
    },
});

// Email data
const _mailOptions = (to: string, subject: string, text: string) => {
    return {
        from: nodemailerProps.FROM,
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
