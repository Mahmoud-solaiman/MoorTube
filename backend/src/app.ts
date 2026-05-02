import express from 'express';
import userRouter from './routes/user.route';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use('/auth', userRouter);
export default app;