import express from 'express';
import authRoutes from './routes/auth.route';
import discRoutes from './routes/disc.route';
import noteRoutes from './routes/note.route';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/discs', discRoutes);
app.use('/notes', noteRoutes);


export default app;