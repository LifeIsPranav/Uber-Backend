import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("fullname.firstname").isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
  body("password").isLength({min: 3}).withMessage("Password must be at least 3 characters long"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({min: 3}).withMessage("Password must be at least 3 characters long"),
];