import express from 'express';
import userRouter from './routes/user.route';
import discRouter from './routes/disc.route';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use('/auth', userRouter);
app.use('/discs', discRouter);
export default app;