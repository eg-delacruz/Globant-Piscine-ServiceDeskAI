import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { router } from '@routes/index';

// Middlewares
import { clientHeaderCheck } from '@middlewares/clientHeader.middleware';
import { errorHandler } from '@middlewares/error.middleware';
import { notFoundMiddleware } from '@middlewares/notFound.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

// Health check endpoint. TODO: erase in the end
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Client header check middleware
app.use(clientHeaderCheck);

// Routes
app.use('/api', router);

// 404 Not Found middleware
app.use(notFoundMiddleware);

// Error handling middleware
app.use(errorHandler);

export default app;

/* 
backend/
│
├── src/
│   ├── index.ts ✅
│   ├── app.ts ✅
│   ├── config/ ✅
│   │   ├── env.ts ✅
│   │   ├── db.ts ✅
│   │   └── logger.ts ✅
│   │
│   ├── middleware/ ✅
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts ✅
│   │   └── role.middleware.ts
│   │
│   ├── utils/ ✅
│   │   ├── response.ts
│   │   ├── jwt.ts
│   │   └── hashing.ts
│   │
│   ├── modules/ ✅
│   │   ├── user/
│   │   │   ├── user.model.ts ✅
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.routes.ts
│   │   │   └── user.types.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.types.ts
│   │   │
│   │   ├── report/
│   │   │   ├── report.model.ts
│   │   │   ├── report.controller.ts
│   │   │   ├── report.service.ts
│   │   │   └── report.routes.ts
│   │
│   ├── routes/ ✅
│   │   └── index.ts ✅
│   │
│   └── seed/ ✅
│       └── ensureSuperUser.ts ✅
│
├── package.json
├── tsconfig.json
└── Dockerfile

*/
