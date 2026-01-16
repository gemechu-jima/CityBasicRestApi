// userService.test.js
import { createCity } from "../controller/cityController.js";

const mockPool = {
  query: jest.fn().mockResolvedValue({
    rows: [
      {
        id: 1,
        name: "addis",
        country: "Ethiopia",
        region: "Addis Ababa",
        population: 15000000,
        postalCode: "0000",
        coordinates: {
          latitude: 9.03,
          longitude: 38.74,
        },
      },
    ],
  }),
};

test("createUser inserts and returns user", async () => {
  const user = await createCity(
    mockPool,
    "addis",
    "Ethiopia",
    "Addis Ababa",
    15000000,
    "0000",
    { latitude: 9.03, longitude: 38.74 }
  );
  expect(user.id).toBe(1);
  expect(user.name).toBe("addis");
  expect(user.country).toBe("Ethiopia");
  expect(user.region).toBe("Addis Ababa");
  expect(user.population).toBe(15000000);
  expect(user.postalCode).toBe("0000");
  expect(user.coordinates).toEqual({ latitude: 9.03, longitude: 38.74 });
  expect(mockPool.query).toHaveBeenCalledWith(
    "INSERT INTO users (id, name,country, region, population, postalcode, coordinates ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      "addis",
      "Ethiopia",
      "Addis Ababa",
      15000000,
      "0000",
      { latitude: 9.03, longitude: 38.74 },
    ]
  );
});
