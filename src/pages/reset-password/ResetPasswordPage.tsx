import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";
import api from "../../api/api";
import { AxiosError } from "axios";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";

type ResetPasswordRequest = {
  code: number;
  newPassword: string;
};

type ResetPasswordResponse = { message: string };

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ResetPasswordRequest>({
    code: 0,
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resetPasswordToken = localStorage.getItem("resetPasswordToken");

      if (!resetPasswordToken) {
        throw new Error("Token não provido.");
      }

      await api.post<ApiResponse<ResetPasswordResponse>>(
        `/auth/change-password-by-email?resetToken=${resetPasswordToken}`,
        form
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
    <section className="reset-password-section">
      <div className="reset-password-left-side">
        <div className="reset-password-container">
          <h1 className="reset-password-logo">CineVerse</h1>

          <form className="reset-password-form" onSubmit={handleSubmit}>
            <h2 className="reset-password-form-message">
              Insira o código enviado por email.
            </h2>

            <div className="reset-password-group">
              <label className="reset-password-label" htmlFor="code">
                Código:
              </label>
              <input
                className="reset-password-input"
                placeholder="Digite seu nome"
                type="text"
                id="code"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reset-password-group">
              <label className="reset-password-label" htmlFor="password">
                Nova senha:
              </label>
              <input
                className="reset-password-input"
                placeholder="Digite sua nova senha"
                type="password"
                id="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="reset-password-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Mudando senha..." : "Mudar senha"}
            </button>
          </form>
        </div>
      </div>
      <img
        src="src/assets/pessoas_sentadas_assistindo.png"
        className="reset-password-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
