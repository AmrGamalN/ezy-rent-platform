import {
  logger,
  ResponseOptions,
  serviceResponse,
} from '@amrogamal/shared-code';
import nodemailer from 'nodemailer';
import config from '../config/env.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: config.mailer.host,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.pass,
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
      from: config.mailer.user,
      to: email,
      subject: subject,
      html: content,
    });

    if (sendMail.rejected.length > 0)
      return serviceResponse({
        statusText: 'BAD_REQUEST',
        message: `Email rejected: ${sendMail.rejected.join(', ')}`,
      });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return serviceResponse({
      statusText: 'INTERNAL',
      message: 'Internal server error',
    });
  }
};
