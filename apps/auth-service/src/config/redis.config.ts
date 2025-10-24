import { createClient } from 'redis';
import config from './env.config';

export const redis = config.redis.useRedisUrl
  ? createClient({
      url: String(config.redis.url),
    })
  : createClient({
      username: 'default',
      password: String(config.redis.password),
      socket: {
        port: Number(config.redis.port),
        host: String(config.redis.host),
      },
    });
