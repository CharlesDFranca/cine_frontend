import type { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";
import "./LoginPage.css";
import {
  AuthButton,
  AuthForm,
  AuthInput,
  AuthSection,
} from "../../components/auth";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginRequestSchema = z.object({
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

type LoginRequest = z.infer<typeof loginRequestSchema>;

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginRequestSchema),
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: LoginRequest) => {
    setLoading(true);

    try {
      const response = await api.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        data
      );

      if (!response.data.success || !response.data.data) {
        alert(
          "Algo deu errado. Por favor, tente novamente em alguns instantes."
        );
        return;
      }

      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      navigate("/movie-list");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiResponse<ErrorResponse>>;
      console.log({ ...error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSection>
      <AuthForm
        onSubmit={handleSubmit(handleSubmitForm)}
        message="Bem vindo de volta!"
      >
        <AuthInput
          label="E-mail"
          type="email"
          inputId="email"
          placeholder="Digite seu email"
          {...register("email")}
        >
          {errors.email && <span>{errors.email.message}</span>}
        </AuthInput>
        <AuthInput
          label="Senha"
          type="password"
          inputId="password"
          placeholder="Digite sua senha"
          {...register("password")}
        >
          {errors.password && <span>{errors.password.message}</span>}
        </AuthInput>

        <AuthButton
          buttonMessage="Entrar"
          loadindMessage="Entrando..."
          loading={loading}
        />

        <div className="login-links">
          <Link to="/forgot-password">Esqueceu a senha?</Link>
          <span>
            Não possui conta? <Link to="/register">Faça o cadastro.</Link>
          </span>
        </div>
      </AuthForm>
    </AuthSection>
  );
}
