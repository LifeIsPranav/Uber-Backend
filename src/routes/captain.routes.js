import express, { Router } from 'express';
import { loginValidator, registerValidation } from '../validators/captain.validator.js';
import { loginCaptain, registerCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middleware/auth.middleware.js';

// import { authUser } from '../middleware/auth.middleware.js';


const captainRouter = express.Router();


captainRouter.post('/register', registerValidation, registerCaptain)
captainRouter.post('/login', loginValidator, loginCaptain)
// captainRouter.get('/profile', authCaptain)
// captainRouter.get('/logout', authCaptain)


export default captainRouter;