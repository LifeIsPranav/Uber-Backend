import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import mapsRoutes from './routes/maps.routes.js';
import userRoutes from './routes/user.routes.js';
import { connectDb } from './config/db.config.js';
import ridesRoutes from './routes/rides.routes.js';
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

app.use("/api/v1/maps", mapsRoutes)
app.use('/api/v1/rides', ridesRoutes)

export default app;