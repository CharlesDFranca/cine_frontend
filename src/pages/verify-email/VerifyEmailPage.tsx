import "./VerifyEmailPage.css";
import api from "../../api/api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";
import {
  AuthButton,
  AuthForm,
  AuthInput,
  AuthSection,
} from "../../components/auth";
import { verifyEmailRequest } from "./schemas/verifyEmailSchemas";

type VerifyEmailRequest = z.infer<typeof verifyEmailRequest>;

type VerifyEmailResponse = {
  message: string;
};

export function VerifyEmailPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyEmailRequest),
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      validateEmailToken: "",
      code: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (data: VerifyEmailRequest) => {
    setLoading(true);

    try {
      const validateEmailToken = localStorage.getItem("validateEmailToken");

      if (!validateEmailToken) throw new Error("Usuário não registrado.");

      data.validateEmailToken = validateEmailToken;

      await api.post<ApiResponse<VerifyEmailResponse>>(
        `/auth/validate-email?token=${validateEmailToken}`,
        data
      );

      localStorage.removeItem("validateEmailToken");

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
          type="number"
          label="Código"
          placeholder="Digite o código"
          {...register("code")}
        >
          {errors.code && <span>{errors.code.message}</span>}
        </AuthInput>

        <AuthButton
          loading={loading}
          buttonMessage="Verificar"
          loadingMessage="Verificando..."
        />
      </AuthForm>
    </AuthSection>
  );
}
