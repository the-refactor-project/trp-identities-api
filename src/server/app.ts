import express from "express";
import morgan from "morgan";
import cors from "cors";
import validateToken from "../auth/middlewares/validateToken.js";
import validateAuthHeaders from "../auth/middlewares/validateAuthHeaders.js";
import validateApp from "../auth/middlewares/validateApp.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/checkToken", validateAuthHeaders(), validateToken, validateApp);

export default app;
