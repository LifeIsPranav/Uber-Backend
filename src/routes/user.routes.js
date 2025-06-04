import express from 'express';

import { registerUser } from '../controllers/user.controller.js';
import { registerValidation } from '../validators/user.validators.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerValidation, registerUser);
// userRoutes.post('/login')
// userRoutes.get('/profile')
// userRoutes.get('/logout')


export default userRoutes