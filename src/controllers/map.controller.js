import { validationResult } from "express-validator";
import { getAddressCoordinate, getDistanceAndTime } from "../services/map.services";


export const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinate(address);

    return res.status(200).json({
      success: true,
      message: "Coordinates fetched successfully",
      data: coordinates
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Coordinates not found",
      error: error.message
    });
  }
}

export const getDistanceAndTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    const { origin, destination } = req.query;

    const distanceTime = await getDistanceAndTime(origin, destination);

    return res.status(200).json({
      success: true,
      message: "Distance and time fetched successfully",
      data: distanceTime
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Distance and time not found",
      error: error.message
    });
  }
}

export const getAutoCompleteSuggestions = async (req, res) => {
  
}
