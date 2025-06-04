import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js';
import { connectDb } from './config/db.config.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
connectDb()

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use("/api/v1/user", userRoutes)

export default app;