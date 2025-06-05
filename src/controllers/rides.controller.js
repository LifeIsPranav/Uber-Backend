import { validationResult } from "express-validator";
import { getAddressCoordinate, getAutoCompleteSuggestionservice, getCaptainInTheRadius, getDistanceAndTime } from "../services/map.services.js";
import rideModel from "../models/ride.model.js";
import { confirmRideService, createRideService, endRideService, getFareService, startRideService } from "../services/rides.services.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRideService({user: req.user._id, pickup, destination, vehicleType});
    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: ride
    });

    const pickupCoords = await getAddressCoordinate(pickup);
    const captainsInRadius = await getCaptainInTheRadius(pickupCoords.lat, pickupCoords.lng, 2);

    ride.otp = ""

    const rideWithUser = await rideModel.findById(ride._id).populate("user");

    captainsInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser
      });
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to create ride",
      error: error.message
    });
  }
}

export const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.body;

  try {
    const fareDetails = await getFareService(pickup, destination);

    return res.status(200).json({
      success: true,
      message: "Fare details fetched successfully",
      data: fareDetails
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Failed to fetch fare details",
      error: error.message
    });
  }
}

export const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await confirmRideService({rideId, captain: req.captain});

    sendMessageToSocketId(captain.socketId, {
      event: "new-ride",
      data: ride
    });

    return res.status(200).json({
      success: true,
      message: "Ride confirmed successfully",
      data: ride
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to confirm ride",
      error: error.message
    });
  }
}

export const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.body;

  try {
    const ride = startRideService({rideId, otp, captain: req.captain});
    
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride
    });

    return res.status(200).json({
      success: true,
      message: "Ride started successfully",
      data: ride
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to start ride",
      error: error.message
    });
  }
}

export const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await endRideService(rideId);
    
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride
    });

    return res.status(200).json({
      success: true,
      message: "Ride ended successfully",
      data: ride
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to end ride",
      error: error.message
    });
  }
}