import { z } from "zod";

export const authHeadersSchema = z.object({
  authorization: z
    .string({ message: "Missing authorization header" })
    .startsWith("Bearer ", { message: "Missing bearer in header" }),
  "x-api-key": z
    .string({ message: "Missing API key" })
    .nonempty({ message: "Empty API key" }),
});
