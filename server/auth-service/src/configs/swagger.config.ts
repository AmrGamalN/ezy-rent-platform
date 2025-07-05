import { Application, NextFunction, Response, Request } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = (route: string): object => {
  return {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ezy Rent API',
        version: '1.0.0',
        description: `API documentation for the ${route}`,
      },
      servers: [
        {
          url: process.env.BACKEND_URL,
          description: 'Local server for development',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [
      `./src/routes/${route}/*.ts`,
      `./src/swaggers/components/${route}.component.ts`,
      `./src/swaggers/responses/${route}.response.ts`,
      `./src/swaggers/tags/${route}.tag.ts`,
      `./src/swaggers/parameters/*.ts`,
      `./src/swaggers/queries/*.ts`,
    ],
  };
};

export const swaggerDoc = (app: Application): void => {
  app.use(`/api-docs/:routeName`, swaggerUi.serve);
  app.use(
    '/api-docs/:routeName',
    (req: Request, res: Response, next: NextFunction) => {
      const routeName = req.params.routeName;
      const swaggerSpecs = swaggerJSDoc(swaggerOptions(routeName));
      return swaggerUi.setup(swaggerSpecs, { explorer: true })(req, res, next);
    },
  );
};
