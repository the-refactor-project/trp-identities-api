import { NextFunction, Response } from "express";
import { AuthRequest } from "../types.js";
import supabaseClient from "../../database/supabase/supabase.js";
import chalk from "chalk";

const validateApp = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const appName = req.headers["x-api-key"]!;

  const { data, error } = await supabaseClient
    .from("apps")
    .select()
    .eq("name", appName);

  if (error || data.length === 0) {
    console.log(chalk.red(`Error: app name "${appName}" not allowed`));
    res.status(403).json({ error: "Access forbidden" });
    return;
  }

  next();
};

export default validateApp;
