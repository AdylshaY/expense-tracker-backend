import express, { Express } from 'express';
import helmet from 'helmet';

import { PORT, NODE_ENV } from './config/env';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import categoryRouter from './routes/category.routes';
import budgetRouter from './routes/budget.routes';
import transactionRouter from './routes/transaction.routes';
import { responseMiddleware } from './middleware/responseMiddleware';
import { defaultRateLimiter } from './middleware/rateLimitMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger';
import { scheduleTokenCleanup } from './utils/cleanup';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(responseMiddleware);
app.use(defaultRateLimiter);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.use('/v1/auth', authRouter);
app.use('/v1/users', userRouter);
app.use('/v1/categories', categoryRouter);
app.use('/v1/budgets', budgetRouter);
app.use('/v1/transactions', transactionRouter);

const cleanupInterval = scheduleTokenCleanup(60);

process.on('SIGINT', () => {
  console.log('Shutting down application...');
  clearInterval(cleanupInterval);
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(
    `NODE_ENV: ${NODE_ENV}\nServer is running on port: http://localhost:${PORT}`
  );
});

export default app;
