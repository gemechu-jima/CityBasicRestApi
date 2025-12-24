import { v4 } from "uuid";
import { cities } from "../config/db.js";

const createCity = async (req, res) => {
  const { name, country, region, population, postalCode, coordinates } =
    req.body;
  const id = new Date().now();
  console.log(id, name, country, region, population, postalCode, coordinates);

  try {
    const findExistCity = cities.find(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    );
    if (findExistCity) {
      return res
        .status(409)
        .json({ message: "This city is already registered" });
    } else {
      const newCity = {
        id,
        name,
        population,
        region,
        country,
        postalCode,
        coordinates,
      };
      cities.push(newCity);
      return res.status(201).json(newCity);
    }
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
    const existCity = cities.find(city => city.id === id);
    if (!existCity) {
      return res.status(404).json({ message: "This City not found" });
    }
    return res.status(200).json(existCity);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
const updateCityById = async (req, res) => {};
const deleteCityById = async (req, res) => {};

export { createCity, getCities, getCityById, updateCityById, deleteCityById };
