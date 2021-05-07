import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import { AppError } from '../../errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
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
