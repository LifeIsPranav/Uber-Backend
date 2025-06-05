import { validationResult } from "express-validator";


export const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinates(address);

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

export const getDistanceAndTime = async (req, res) => {}

export const getAutoCompleteSuggestions = async (req, res) => {}
