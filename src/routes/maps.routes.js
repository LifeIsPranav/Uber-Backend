import express from "express";
import { query } from "express-validator";

import { authUser } from "../middleware/auth.middleware.js";
import { getAutoCompleteSuggestions, getCoordinates, getDistanceAndTime } from "../controllers/map.controller.js";


const mapsRoutes = express.Router();

mapsRoutes.get("/get-coordinates", query("address").isString().isLength({min: 2}), authUser, getCoordinates)

mapsRoutes.get("/get-distance-time", query("origin").isString().isLength({min: 2}), query("destination").isString().isLength({min: 2}), authUser, getDistanceAndTime)

mapsRoutes.get("/get-suggestions", query("input").isString().isLength({min: 2}), authUser, getAutoCompleteSuggestions)


export default mapsRoutes;