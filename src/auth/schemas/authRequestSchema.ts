import { z } from "zod";

export const authHeadersSchema = z.object({
  authorization: z.string().startsWith("Bearer "),
});
