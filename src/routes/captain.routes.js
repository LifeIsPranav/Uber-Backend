import express, { Router } from 'express';
import { loginValidator, registerValidation } from '../validators/captain.validator.js';
import { loginCaptain, registerCaptain } from '../controllers/captain.controller.js';

// import { authUser } from '../middleware/auth.middleware.js';


const captainRouter = express.Router();


captainRouter.post('/register', registerValidation, registerCaptain)
captainRouter.post('/login', loginValidator, loginCaptain)
// captainRouter.get('/profile', )
// captainRouter.get('/logout', )


export default captainRouter;