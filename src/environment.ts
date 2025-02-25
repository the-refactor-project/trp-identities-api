import chalk from "chalk";
import "dotenv/config";

const environmentVariables = [
  "SUPABASE_AUTH_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "PROMO",
] as const;

type EnvironmentVariable = (typeof environmentVariables)[number];

environmentVariables.forEach((environmentVariable) => {
  if (!process.env[environmentVariable]) {
    console.log(chalk.red("Missing environment variables"));
    process.exit(1);
  }
});

const environment: Record<EnvironmentVariable, string> = {
  SUPABASE_AUTH_URL: process.env.SUPABASE_AUTH_URL!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  PROMO: process.env.PROMO!,
};

export default environment;
