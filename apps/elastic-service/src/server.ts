import { Request, Response } from 'express';
import app from './app';
import { logger } from '@amrogamal/shared-code';
import { HandleError } from '@amrogamal/shared-code';
import { kafkaStart } from './kafka/consumer.init';
const { errorMiddleware } = HandleError.getInstance();
const PORT = process.env.PORT || 5000;

Promise.all([kafkaStart()])
  .then(async () => {
    if (process.env.NODE_ENV !== 'production') {
      const { setupSwagger } = await import('./config/swagger.config');
      setupSwagger(app);
    }

    app.use((req: Request, res: Response) => {
      res.status(404).json({ message: 'Page not found' });
    });
    app.use(errorMiddleware());

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to start server:', error);
  });
