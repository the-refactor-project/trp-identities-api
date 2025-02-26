import express from "express";
import morgan from "morgan";
import cors from "cors";
import validateToken from "../auth/middlewares/validateToken.js";
import validateAuthHeaders from "../auth/middlewares/validateAuthHeaders.js";
import { AuthRequest } from "../auth/types.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.get("/", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get(
  "/checkIdentity",
  validateAuthHeaders(),
  validateToken,
  (req: AuthRequest, res) => {
    res.status(200).json({ user: req.user });
  }
);

app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default app;
