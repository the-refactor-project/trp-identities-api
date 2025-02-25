import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import { authHeadersSchema } from "../schemas/authRequestSchema.js";

const validateAuthHeaders = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const headersValidation = authHeadersSchema.safeParse(req.headers);

    if (!headersValidation.success) {
      console.log(chalk.red(`Error: Missing bearer in headers`));
      res.status(400).json({ error: "Invalid headers" });
      return;
    }

    next();
  };
};

export default validateAuthHeaders;
