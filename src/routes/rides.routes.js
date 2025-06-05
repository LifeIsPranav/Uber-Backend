import express from 'express';
import {body, query} from 'express-validator';
import { authUser, authCaptain } from '../middleware/auth.middleware.js';
import { confirmRide, createRide, endRide, getFare, startRide } from '../controllers/rides.controller.js';


const ridesRoutes = express.Router();


ridesRoutes.post(
  "/create",

  authUser,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),

  createRide
);

ridesRoutes.get(
  "/get-fare",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  getFare
);

ridesRoutes.post("/confirm", authCaptain ,  body('rideId').isMongoId().withMessage('Invalid ride id'), confirmRide)

ridesRoutes.get("/start-ride", authCaptain ,  query('rideId').isMongoId().withMessage('Invalid ride id'), query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'), startRide )

ridesRoutes.post("/end-ride" , authCaptain ,  body('rideId').isMongoId().withMessage('Invalid ride id') , endRide)


export default ridesRoutes;