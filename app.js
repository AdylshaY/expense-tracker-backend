import express from 'express';

import { PORT, NODE_ENV } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(
    `NODE_ENV: ${NODE_ENV}\nServer is running on port: http://localhost:${PORT}`
  );
});

export default app;
