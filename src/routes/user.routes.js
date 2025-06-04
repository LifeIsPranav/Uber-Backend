import express from 'express';

import { loginUser, registerUser } from '../controllers/user.controller.js';
import { loginValidator, registerValidation } from '../validators/user.validators.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerValidation, registerUser);
userRoutes.post('/login', loginValidator, loginUser)
// userRoutes.get('/profile')
// userRoutes.get('/logout')


export default userRoutes