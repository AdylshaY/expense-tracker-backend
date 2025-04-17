import express, { Express } from 'express';

import { PORT, NODE_ENV } from './config/env';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';

const app: Express = express();

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(
    `NODE_ENV: ${NODE_ENV}\nServer is running on port: http://localhost:${PORT}`
  );
});

export default app;
