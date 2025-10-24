// Environment Variables Configuration
const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost',
    backendUrl: process.env.BACKEND_URL,
  },

  db: {
    mongoUri: process.env.MONGODB_URI as string,
    postgresUrl: process.env.POSTGRE_URL,
  },

  redis: {
    url: process.env.REDIS_URL,
    secret: process.env.REDIS_SECRET,
    password: process.env.REDI_PASSWORD,
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    useRedisUrl: process.env.USE_REDIS_URL === 'true',
  },

  mailer: {
    host: process.env.HOST_NODE_MAILER,
    user: process.env.USER_NODE_MAILER,
    pass: process.env.PASS_NODE_MAILER,
  },

  jwt: {
    secret: process.env.JWT_SECRET as string,
    accessExpire: process.env.ACCESS_TOKEN_EXPIRE || '1d',
    refreshExpire: process.env.REFRESH_TOKEN_EXPIRE || '14d',
  },

  encryption: {
    key: process.env.ENCRYPTION_KEY,
  },

  firebase: {
    adminConfig: JSON.parse(process.env.FIREBASE_CONFIG_ADMIN || '{}'),
    clientConfig: JSON.parse(process.env.FIREBASE_CONFIG_CLIENT || '{}'),
    apiKey: process.env.FIREBASE_API_KEY,
  },

  s3: {
    accessKey: process.env.AWS_ACCESS_KEY as string,
    secretKey: process.env.AWS_SECRET_KEY as string,
    region: process.env.AWS_REGION as string,
    bucketName: process.env.AWS_BUCKET_NAME as string,
  },

  logger: {
    path: process.env.LOGGER_PATH || './logs/error.log',
  },
};

export default config;
