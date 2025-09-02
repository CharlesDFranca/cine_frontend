import { z } from "zod";

export const resetPasswordRequest = z.object({
  code: z.coerce
    .number("O código precisa ser um número inteiro.")
    .int("O código precisa ser um número inteiro"),
  newPassword: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(128, "A senha deve ter no máximo 128 caracteres.")
    .refine((password) => /[a-z]/.test(password), {
      message: "A senha deve ter pelo menos uma letra minúscula.",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "A senha deve ter pelo menos uma letra maiúscula.",
    })
    .refine((password) => /\d/.test(password), {
      message: "A senha deve ter pelo menos um número.",
    })
    .refine((password) => /[^a-zA-Z0-9]/.test(password), {
      message: "A senha deve ter pelo menos um caractere especial.",
    }),
});
