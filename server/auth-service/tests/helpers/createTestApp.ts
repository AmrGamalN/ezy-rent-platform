import express, { Router, Application, Request, Response } from 'express';
import { mongodbConnect } from '../../src/configs/mongodb.config';
import { redis } from '../../src/configs/redis.config';
import { HandleError, logger } from '@amrogamal/shared-code';
const { errorMiddleware } = HandleError.getInstance();
const PORT = process.env.PORT || 3000;

export const createTestApp = (route: Router, path: string): Application => {
  const app = express();
  app.use(express.json());
  app.use(path, route);
  Promise.all([
    mongodbConnect(),
    redis
      .connect()
      .then(() => logger.info('Connected to Redis!'))
      .catch((error) => logger.error(error)),
  ])
    .then(() => {
      app.use((req: Request, res: Response) => {
        res.status(404).json({ message: 'Page not found' });
      });
      app.use(errorMiddleware());
      app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      logger.error(error);
    });
  return app;
};
