import app from "./app";
import dotenv from 'dotenv';
import dns from 'node:dns';
import connectDB from './config/db';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});