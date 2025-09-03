import { useState } from "react";
import "./ForgotPasswordPage.css";
import type { AxiosError } from "axios";
import { useNavigate, type ErrorResponse } from "react-router-dom";
import api from "../../api/api";
import type { ApiResponse } from "../../types/api-response";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AuthButton,
  AuthForm,
  AuthInput,
  AuthSection,
} from "../../components/auth";
import { forgotPasswordRequest } from "./schemas/forgotPasswordSchema";

type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequest>;

type ForgotPasswordResponse = {
  resetPasswordToken: string;
};

export function ForgotPasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordRequest),
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: ForgotPasswordRequest) => {
    setLoading(true);

    try {
      const response = await api.post<ApiResponse<ForgotPasswordResponse>>(
        "/auth/request-password-reset",
        data
      );

      if (!response.data.success || !response.data.data) {
        throw new Error("Algo deu errado");
      }

      localStorage.setItem(
        "resetPasswordToken",
        response.data.data.resetPasswordToken
      );

      navigate("/reset-password");
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
        message="Por favor, digite seu e-mail."
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <AuthInput
          type="email"
          inputId="email"
          label="E-mail"
          placeholder="Digite seu email"
          {...register("email")}
        >
          {errors.email && errors.email.message}
        </AuthInput>

        <AuthButton
          buttonMessage="Enviar"
          loadingMessage="Enviando..."
          loading={loading}
        />
      </AuthForm>
    </AuthSection>
  );
}
