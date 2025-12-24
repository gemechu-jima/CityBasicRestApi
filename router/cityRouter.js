import express from "express"
import { createCity, getCities, getCityById, updateCityById, deleteCityById } from "../controller/cityController.js"
const router=express.Router()

router.post("/cities", createCity)
router.get("/cities", getCities)
router.get("/cities/:id", getCityById)
router.put("/cities/:id", updateCityById)
router.delete("/cities/:id",deleteCityById)


export default router