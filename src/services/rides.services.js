import bcrypt from "bcrypt";
import crypto from "crypto";

import rideModel from "../models/ride.model.js";
import { getAddressCoordinate, getDistanceAndTime, getAutoCompleteSuggestionservice, getCaptainInTheRadius } from "../services/map.services.js";


export const getFareService = async (pickup, destination) => {
  if(!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);
  const baseFare = {
    auto: 20,
    car: 50,
    bike: 20
  }

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 5
  }

  const fare = {
    auto: Math.round((baseFare.auto + (distanceTime.distance_km / 1000) * perKmRate.auto) + ((distanceTime.duration_min / 60) * perMinuteRate.auto) )

  }
}

const getOtp = async (num) => {}

export const createRideService = async({ user, pickup, destination, vehicleType }) => {  }

export const confirmRideService = async ({rideId, captain}) => {}

export const startRideService = async ({rideId, otp, captain}) => {}

export const endRideService = async ({rideId, captain}) => {}
