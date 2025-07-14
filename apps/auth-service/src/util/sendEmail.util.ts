import {
  logger,
  ResponseOptions,
  serviceResponse,
} from '@amrogamal/shared-code';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.HOST_NODE_MAILER,
  auth: {
    user: process.env.USER_NODE_MAILER,
    pass: process.env.PASS_NODE_MAILER,
  },
  port: 587,
  secure: false,
});

export const sendEmail = async (
  email: string,
  subject: string,
  content: string,
): Promise<ResponseOptions> => {
  try {
    const sendMail = await transporter.sendMail({
      from: process.env.USER_NODE_MAILER,
      to: email,
      subject: subject,
      html: content,
    });

    if (sendMail.rejected.length > 0)
      return serviceResponse({
        statusText: 'BadRequest',
        message: `Email rejected: ${sendMail.rejected.join(', ')}`,
      });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return serviceResponse({
      statusText: 'InternalServerError',
      message: 'Internal server error',
    });
  }
};
