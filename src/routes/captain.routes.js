import express, { Router } from 'express';

import { authUser } from '../middleware/auth.middleware';


const captainRouter = express.Router();


captainRouter.post('/register', )
captainRouter.post('/login', )
captainRouter.get('/profile', )
captainRouter.get('/logout', )


export default captainRouter;