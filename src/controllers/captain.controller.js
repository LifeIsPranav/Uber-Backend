import { validationResult } from "express-validator";

import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";


export const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });

  } catch (error) {
    console.error("Error in registerCaptain:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email });
    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    } 
    const isPasswordValid = await captainModel.comparePassword(password, captain.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.cookie("token", captain.generateAuthToken());
    res.status(200).json({ captain, token }); 

  } catch (error) {
    console.error("Error in loginCaptain:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getCaptainProfile = async (req, res) => {
  const captain = req.captain;
  res.status(200).json(captain);
}