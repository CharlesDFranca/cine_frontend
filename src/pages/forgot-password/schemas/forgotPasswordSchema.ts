import { z } from "zod";

export const forgotPasswordRequest = z.object({
  email: z.email("Por favor, digite um email válido."),
});
