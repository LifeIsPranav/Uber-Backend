import captainModel from "../models/captain.model.js";


export const createCaptain = async ({firstname, lastname, email, password, color, plate, vehicleType, capacity}) => {
  if(!firstname || !lastname || !email || !password || !color || !plate || !vehicleType || !capacity) {
    throw new Error("All fields are required");
  }

  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      vehicleType,  
      capacity
    }
  })

  return captain;
}