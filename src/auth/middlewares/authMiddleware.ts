import { NextFunction, Response } from "express";
import supabaseAuthClient from "../supabase/supabaseAuth.js";
import { AuthRequest } from "../types.js";

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization!;

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabaseAuthClient.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  const username = data.user.user_metadata.user_name;

  req.user = {
    ...data.user,
    role: username === "the-refactor-project" ? "admin" : "student",
  };

  next();
};

export default authMiddleware;
