# CityBasicRestApi

Small Express-based REST API for basic city management. This project exposes endpoints to create and list cities, delted and update operation and serves a minimal in-memory data store in array as object in array.

## Install

```bash
npm install
```

## Run

Start the server in development using nodemon (defined in `package.json`):

```bash
npm start
```

Or run directly with Node:

```bash
node server.js
```

The server listens on port `4000` by default and mounts the API under the base path `/api/v1`.

Root URL: [http://localhost:4000/](http://localhost:4000/)

## Environment

- `NODE_ENV` (optional) — used by `morgan` for logging mode.

## Endpoints

Base path: `/api/v1`

- `POST /api/v1/cities` — Create a new city.
  - Request JSON body:
    - `name` (string) — required
    - `country` (string)
    - `region` (string)
    - `population` (number)
    - `postalCode` (string)
    - `coordinates` (object) — e.g. `{ "latitude": 9.03, "longitude": 38.74 }`
  - Success: `201 Created` with the created city object.

  Example:

  ```bash
  curl -X POST http://localhost:4000/api/v1/cities \
    -H "Content-Type: application/json" \
    -d '{"name":"New City","country":"Country","region":"Region","population":1000}'
  ```

- `GET /api/v1/cities` — Returns all cities.
  - Success: `200 OK` with `{ "cities": [ ... ] }`.

  Example:

  ```bash
  curl http://localhost:4000/api/v1/cities
  ```

- `GET /api/v1/cities/:id` — Return a single city by id.
  - `:id` is treated as a numeric id. Success: `200 OK` with the city object. If not found: `404`.

  Example:

  ```bash
  curl http://localhost:4000/api/v1/cities/1
  ```

- `PUT /api/v1/cities/:id` — Update an existing city by id.
  - Request JSON body: any of the city fields (`name`, `country`, `region`, `population`, `postalCode`, `coordinates`).
  - Success: `200 OK` with the updated cities array. If id not found: `404`.

  Example:

  ```bash
  curl -X PUT http://localhost:4000/api/v1/cities/1 \
    -H "Content-Type: application/json" \
    -d '{"population":2000000}'
  ```

- `DELETE /api/v1/cities/:id` — Delete a city by id.
  - Success: `200 OK` with `{ "message": "City is deleted successfully" }`. If id not provided or not found: `400` or `404` respectively.

  Example:

  ```bash
  curl -X DELETE http://localhost:4000/api/v1/cities/1
  ```

## Notes

- Data is stored in-memory in `config/db.js` (not persisted). Restarting the server resets the data.
- Implemented controllers: `createCity`, `getCities`, `getCityById`, `updateCityById`, and `deleteCityById` in `controller/cityController.js`.
- Dependencies used: `express`, `dotenv`, `morgan`, `cors`, `uuid`. but for now I deleted UUid because confilct with hardcode in memory array when I filter for delete and update 

## Folder structure and file

- `server.js` — app entry .
- `middleware` - middleware empty it for my structure folder.
- `router/cityRouter.js` — API routes.
- `controller/cityController.js` — controller implementations.
- `config/db.js` — in-memory data store.





