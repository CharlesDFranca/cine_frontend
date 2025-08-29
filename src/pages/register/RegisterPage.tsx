import { z } from "zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPageStyle.css";
import api from "../../api/api";
import { AxiosError } from "axios";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";
import { zodResolver } from "@hookform/resolvers/zod";

const registerRequestSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres."),
  email: z.email("Por favor, digite um email válido."),
  password: z
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

type RegisterRequest = z.infer<typeof registerRequestSchema>;
type RegisterResponse = {
  userId: string;
  message: string;
};

export function RegisterPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerRequestSchema),
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: RegisterRequest) => {
    setLoading(true);

    try {
      const response = await api.post<ApiResponse<RegisterResponse>>(
        "/auth/register",
        data
      );

      if (!response.data.success || !response.data.data) {
        throw new Error("Algo deu errado.");
      }

      localStorage.setItem("userId", response.data.data.userId);

      navigate("/verify-email");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiResponse<ErrorResponse>>;
      console.log({ ...error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration-section">
      <div className="registration-left-side">
        <div className="registration-container">
          <h1 className="registration-logo">CineVerse</h1>

          <form
            className="registration-form"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <h2 className="registration-form-message">Seja muito bem vindo!</h2>

            <div className="registration-group">
              <label className="registration-label" htmlFor="name">
                Nome:
              </label>
              <input
                className="registration-input"
                placeholder="Digite seu nome"
                type="text"
                id="name"
                {...register("name")}
                required
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div className="registration-group">
              <label className="registration-label" htmlFor="email">
                E-mail:
              </label>
              <input
                className="registration-input"
                placeholder="Digite seu email"
                type="email"
                id="email"
                {...register("email")}
                required
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="registration-group">
              <label className="registration-label" htmlFor="password">
                Senha:
              </label>
              <input
                className="registration-input"
                placeholder="Digite sua senha"
                type="password"
                id="password"
                {...register("password")}
                required
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <button
              className="registration-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <div className="registration-links">
              <span>
                Já possui conta? <Link to="/login">Faça o login.</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <img
        src="src/assets/pessoas_sentadas_assistindo.png"
        className="registration-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
