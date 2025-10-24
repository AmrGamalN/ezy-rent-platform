// import { Request, Response } from 'express';
import app from './app';
import { mongodbConnect } from './config/mongodb.config';
import { logger } from '@amrogamal/shared-code';
import { redis } from './config/redis.config';
import config from './config/env.config';

// import { HandleError } from '@amrogamal/shared-code';
// const { errorMiddleware } = HandleError.getInstance();
const PORT = config.app.port || 3000;

Promise.all([
  mongodbConnect(),
  redis
    .connect()
    .then(() => logger.info('Connected to Redis!'))
    .catch((error) => logger.error(error)),
])
  .then(async () => {
    if (config.app.nodeEnv !== 'production') {
      const { setupSwagger } = await import('./config/swagger.config');
      setupSwagger(app);
    }

    // app.use((req: Request, res: Response) => {
    //   res.status(404).json({ message: 'Page not found' });
    // });
    // app.use(errorMiddleware());

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to start server:', error);
  });
