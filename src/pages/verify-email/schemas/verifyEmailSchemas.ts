import { z } from "zod";

export const verifyEmailRequest = z.object({
  validateEmailToken: z.string(),
  code: z.coerce.string(),
});
