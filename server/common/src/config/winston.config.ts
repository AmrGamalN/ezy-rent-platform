import {createLogger, format, transports} from 'winston';
const { combine, timestamp, printf, colorize } = format;
import dotenv from 'dotenv';
dotenv.config();
const { LOGGER_PATH, NODE_ENV } = process.env;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat
  ),
  transports: [
    ...(NODE_ENV === "development" ? [new transports.Console()] : []),
    new transports.File({
      filename:
        NODE_ENV === "development" ? LOGGER_PATH : "/src/logs/error.log",
      level: "error",
    }),
  ],
});