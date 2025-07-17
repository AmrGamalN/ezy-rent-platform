import { createLogger, format, transports } from 'winston';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV } = process.env;
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const getCustomFilename = (name: string): string => {
  const now = new Date();
  const day = now.getDate();
  const evenDay = day - (day % 2);
  const customDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(evenDay).padStart(2, '0')}`;
  return path.join(process.cwd(), '/src/logs', `${name}-${customDate}.log`);
};

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat,
  ),
  transports: [
    ...(NODE_ENV === 'development' ? [new transports.Console()] : []),

    new transports.File({
      filename: getCustomFilename('error'),
      level: 'error',
      maxsize: 20 * 1024 * 1024,
    }),

    new transports.File({
      filename: getCustomFilename('combined'),
      level: 'info',
      maxsize: 20 * 1024 * 1024,
    }),
  ],
});
