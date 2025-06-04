import express from 'express';

import { getUserProfile, loginUser, registerUser } from '../controllers/user.controller.js';
import { loginValidator, registerValidation } from '../validators/user.validators.js';
import { authUser } from '../middleware/auth.middleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerValidation, registerUser);
userRoutes.post('/login', loginValidator, loginUser)
userRoutes.get('/profile', authUser, getUserProfile)
// userRoutes.get('/logout')


export default userRoutes