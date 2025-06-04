import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js';
import { connectDb } from './config/db.config.js';
import captainRouter from './routes/captain.routes.js';

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

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/captain", captainRouter)

export default app;