import express from "express";
import morgan from "morgan";
import cors from "cors";
import authMiddleware from "../auth/middlewares/authMiddleware.js";
import validateAuthHeaders from "../auth/middlewares/validateAuthHeaders.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/checkToken", validateAuthHeaders(), authMiddleware);

export default app;
