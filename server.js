import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cityRouter from "./router/cityRouter.js"

config();
const app = express();
const dev=process.env.NODE_ENV

app.use(express.json());
app.use(cors());
app.use(morgan(dev))

app.use('/api/v1', cityRouter)

app.get("/", (req, res) => {
  res.send("City management Rest APi basic operation");
});
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});
const PORT = 4000;
app.listen(PORT, () => {
 console.log(`server is running on http://localhost:${PORT}`)
});
