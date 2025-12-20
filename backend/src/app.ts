import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

import { router } from '@routes/index';

// Middlewares
import { clientHeaderCheck } from '@middlewares/clientHeader.middleware';
import { errorHandler } from '@middlewares/error.middleware';
import { notFoundMiddleware } from '@middlewares/notFound.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// If behind a proxy (e.g., when deployed on Heroku), trust the proxy
app.set('trust proxy', true); // trust first proxy

// Static files (for serving uploaded files)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Cookie parser (used to parse cookies from requests)
app.use(cookieParser());

// HTTP request logger -> displays the requests in the console
app.use(morgan('dev'));

// Client header check middleware
app.use(clientHeaderCheck);

// Routes
app.use('/api', router);

// 404 Not Found middleware
app.use(notFoundMiddleware);

app.use(errorHandler);

export default app;
