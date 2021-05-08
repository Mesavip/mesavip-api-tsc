import 'dotenv/config';
import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';

import { AppError } from '../../errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(fileUpload({ useTempFiles: true }));
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    });
  }
);

export { app };
