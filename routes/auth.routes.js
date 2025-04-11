import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
  res.send({ title: 'Sign Up', message: 'Sign Up successful' });
});

authRouter.post('/sign-in', (req, res) => {
  res.send({ title: 'Sign In', message: 'Sign In successful' });
});

authRouter.post('/sign-out', (req, res) => {
  res.send({ title: 'Sign Out', message: 'Sign Out successful' });
});

export default authRouter;
