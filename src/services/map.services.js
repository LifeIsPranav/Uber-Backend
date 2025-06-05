import axios from 'axios';
import captainModel from '../models/captain.model';


export const getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng
      };
    } else {
      throw new Error('No results found');
    }

  } catch (error) {
    console.log(error)
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
}