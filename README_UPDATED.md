# CityBasicRestApi

Small Express-based REST API for basic city management. This project exposes endpoints to create and list cities and serves a minimal in-memory data store.

## Prerequisites

- Node.js (>=14)
- npm

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

- `POST /api/v1/cities` — Create a new city. JSON body fields:
  - `name` (string) — required
  - `country` (string)
  - `region` (string)
  - `population` (number)
  - `postalCode` (string)
  - `coordinates` (object) — e.g. `{ latitude: 9.03, longitude: 38.74 }`

  Example curl:

  ```bash
  curl -X POST http://localhost:4000/api/v1/cities \
    -H "Content-Type: application/json" \
    -d '{"name":"New City","country":"Country","region":"Region","population":1000}'
  ```

- `GET /api/v1/cities` — Returns all cities in the in-memory store. Response shape: `{ "cities": [ ... ] }`.

  Example curl:

  ```bash
  curl http://localhost:4000/api/v1/cities
  ```

- `GET /api/v1/cities/:id` — (route present, handler stubbed) Intended to return a single city by id.
- `PUT /api/v1/cities/:id` — (route present, handler stubbed) Intended to update a city by id.
- `DELETE /api/v1/cities/:id` — (route present, handler stubbed) Intended to delete a city by id.

## Notes

- Data is stored in-memory in `config/db.js` (not persisted). Restarting the server resets the data.
- Implemented controllers: `createCity` and `getCities`. Other handlers are currently placeholders in `controller/cityController.js`.
- Dependencies used: `express`, `dotenv`, `morgan`, `cors`, `uuid`.

## Files of interest

- `server.js` — app entry and middleware setup.
- `router/cityRouter.js` — API routes.
- `controller/cityController.js` — controller implementations.
- `config/db.js` — in-memory data store.

If you want, I can also add example Postman collection or complete the remaining controllers.
