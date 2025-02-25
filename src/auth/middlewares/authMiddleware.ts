import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import supabaseAuthClient from "../supabase/supabaseAuth.js";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.log(chalk.red("Missing token"));

    res.status(401).json({ error: "Missing token" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabaseAuthClient.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  next();
};

export default authMiddleware;
