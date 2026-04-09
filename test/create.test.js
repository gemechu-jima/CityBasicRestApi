import { jest, test, expect } from '@jest/globals';
import { createCity } from "../controller/cityController.js";

test("createCity inserts and returns city data", async () => {
  // 1. Create a Mock Request
  const req = {
    body: {
      name: "addis",
      country: "Ethiopia",
      region: "Addis Ababa",
      population: 15000000,
      postalCode: "0000",
      coordinates: { latitude: 9.03, longitude: 38.74 }
    }
  };

  // 2. Create a Mock Response
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };

  // 3. Call the controller with (req, res)
  await createCity(req, res);

  // 4. Assertions
  // Since Express controllers usually use res.json(), check that:
  expect(res.status).toHaveBeenCalledWith(201); // Or 200, depending on your code
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({ name: "addis" })
  );
});