import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";
import api from "../../api/api";
import { AxiosError } from "axios";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";
import {
  AuthButton,
  AuthForm,
  AuthInput,
  AuthSection,
} from "../../components/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordRequest } from "./schemas/resetPasswordRequest";

type ResetPasswordRequest = z.infer<typeof resetPasswordRequest>;

type ResetPasswordResponse = { message: string };

export function ResetPasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordRequest),
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      code: "",
      newPassword: "",
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: ResetPasswordRequest) => {
    setLoading(true);

    try {
      const resetPasswordToken = localStorage.getItem("resetPasswordToken");

      if (!resetPasswordToken) {
        throw new Error("Token não provido.");
      }

      await api.post<ApiResponse<ResetPasswordResponse>>(
        `/auth/change-password-by-email?resetToken=${resetPasswordToken}`,
        data
      );

      localStorage.removeItem("resetPasswordToken");

      navigate("/login");
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
        message="Insira o código enviado por email."
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <AuthInput
          inputId="code"
          placeholder="Digite o código"
          type="number"
          label="Código"
          {...register("code")}
        >
          {errors.code && <span>{errors.code.message}</span>}
        </AuthInput>

        <AuthInput
          inputId="newPassword"
          placeholder="Digite a nova senha"
          type="text"
          label="Senha"
          {...register("newPassword")}
        >
          {errors.newPassword && <span>{errors.newPassword.message}</span>}
        </AuthInput>

        <AuthButton
          buttonMessage="Mudar senha"
          loadingMessage="Verificando..."
          loading={loading}
        />
      </AuthForm>
    </AuthSection>
  );
}
