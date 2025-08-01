import { createClient } from 'redis';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const redis =
  process.env.USE_REDIS_URL === 'true'
    ? createClient({
        url: String(process.env.REDIS_URL),
      })
    : createClient({
        username: 'default',
        password: String(process.env.REDI_PASSWORD),
        socket: {
          port: Number(process.env.REDIS_PORT),
          host: String(process.env.REDIS_HOST),
        },
      });
