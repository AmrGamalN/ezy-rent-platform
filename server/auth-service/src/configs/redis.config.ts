import { createClient } from 'redis';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

// export const redis = createClient({
//   url: String(process.env.REDIS_URL),
// });

export const redis = createClient({
  username: 'default',
  password: String(process.env.PASSWORD),
  socket: {
    port: Number(process.env.REDIS_PORT),
    host: String(process.env.REDIS_HOST),
  },
});
