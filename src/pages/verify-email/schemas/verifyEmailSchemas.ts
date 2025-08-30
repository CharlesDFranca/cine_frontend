import { z } from "zod";

export const verifyEmailRequest = z.object({
  userId: z.uuidv4(),
  code: z
    .string()
    .min(6, "O código tem no mínimo 6 dígitos.")
    .max(6, "O código tem no máxima 6 dígitos."),
});
