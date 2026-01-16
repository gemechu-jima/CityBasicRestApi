import { v4 } from "uuid";
import { cities } from "../config/db.js";

// cityController.js
export const createCity = async (req, res) => {
  const { name, country, region, population, postalCode, coordinates } = req.body;
  const id = Date.now();

  try {
    const findExistCity = cities.find(city => city.name.toLowerCase() === name.toLowerCase());
    if (findExistCity) {
      return res.status(409).json({ message: "This city is already registered" });
    }
    const newCity = { id, name, country, region, population, postalCode, coordinates };
    cities.push(newCity);
    return res.status(201).json(newCity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};

const getCities = async (req, res) => {
  try {
    console.log(cities);
    return res.status(200).json({ cities });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
const getCityById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existCity = cities.find((city) => city.id === id);
    if (!existCity) {
      return res.status(404).json({ message: "This City not found" });
    }
    return res.status(200).json(existCity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
const updateCityById = async (req, res) => {
  try {
    const id = parseFloat(req.params.id);
    const { name, country, region, population, postalCode, coordinates } =
      req.body;
    const existCityForUpdateIndex = cities.findIndex((city) => city.id === id);
    if (existCityForUpdateIndex === -1) {
      return res.status(404).json({
        message: "This City not found for update please crreat first",
      });
    } else {
      const updatedCity = {
        ...cities[existCityForUpdateIndex],
        name,
        country,
        region,
        population,
        postalCode,
        coordinates,
      };
      cities[existCityForUpdateIndex] = updatedCity;
      console.log(updatedCity);
      return res.status(200).json(cities);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
const deleteCityById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res
        .status(400)
        .json({ message: "please provide id before delete city" });
    }
    const deletedCity = cities.find((city) => city.id === id);
    if (!deletedCity) {
      return res
        .status(404)
        .json({ message: "This city you provide ID is not found" });
    }
    const index = cities.findIndex((city) => city.id === id);
    if (index !== -1) {
      cities.splice(index, 1);
    }

    return res.status(200).json({ message: "City is deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export { createCity, getCities, getCityById, updateCityById, deleteCityById };
