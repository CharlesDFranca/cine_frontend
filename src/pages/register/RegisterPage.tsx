import "./RegisterPageStyle.css";
import api from "../../api/api";

import {
  AuthButton,
  AuthForm,
  AuthInput,
  AuthSection,
} from "../../components/auth";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerRequestSchema } from "./schemas/registerSchema";

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
        alert("Algo deu errado. Por favor, tente novamente.");
        return;
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
    <AuthSection>
      <AuthForm
        message="Seja muito bem vindo!"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <AuthInput
          label="Name:"
          type="string"
          inputId="register-name"
          placeholder="Digite seu nome"
          {...register("name")}
        >
          {errors.name && <span>{errors.name.message}</span>}
        </AuthInput>

        <AuthInput
          label="E-mail:"
          type="email"
          inputId="register-email"
          placeholder="Digite seu email"
          {...register("email")}
        >
          {errors.email && <span>{errors.email.message}</span>}
        </AuthInput>

        <AuthInput
          label="Senha:"
          type="password"
          inputId="register-password"
          placeholder="Digite sua senha"
          {...register("password")}
        >
          {errors.password && <span>{errors.password.message}</span>}
        </AuthInput>

        <AuthButton
          loading={loading}
          loadindMessage="Cadastrando..."
          buttonMessage="Cadastrar"
        />

        <div className="registration-links">
          <span>
            Já possui conta? <Link to="/login">Faça o login.</Link>
          </span>
        </div>
      </AuthForm>
    </AuthSection>
  );
}
