import express, { Express } from 'express';

import { PORT, NODE_ENV } from './config/env';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import categoryRouter from './routes/category.routes';
import budgetRouter from './routes/budget.routes';
import { responseMiddleware } from './middleware/responseMiddleware';

const app: Express = express();

app.use(express.json());
app.use(responseMiddleware);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/budgets', budgetRouter);

app.listen(PORT, () => {
  console.log(
    `NODE_ENV: ${NODE_ENV}\nServer is running on port: http://localhost:${PORT}`
  );
});

export default app;
