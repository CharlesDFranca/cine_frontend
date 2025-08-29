import { useState, type FormEvent } from "react";
import "./ForgotPasswordPage.css";
import type { AxiosError } from "axios";
import { useNavigate, type ErrorResponse } from "react-router-dom";
import api from "../../api/api";
import type { ApiResponse } from "../../types/api-response";

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  resetPasswordToken: string;
};

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ForgotPasswordRequest>({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post<ApiResponse<ForgotPasswordResponse>>(
        "/auth/request-password-reset",
        form
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
    <section className="forgot-password-section">
      <div className="forgot-password-left-side">
        <div className="forgot-password-container">
          <h1 className="forgot-password-logo">CineVerse</h1>

          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <h2 className="forgot-password-form-message">
              Por favor, digite seu e-mail.
            </h2>

            <div className="forgot-password-group">
              <label className="forgot-password-label" htmlFor="code">
                Email:
              </label>
              <input
                className="forgot-password-input"
                placeholder="Digite o seu email"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="forgot-password-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verificando.." : "Verificar"}
            </button>
          </form>
        </div>
      </div>
      <img
        src="src/assets/pessoas_sentadas_assistindo.png"
        className="forgot-password-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
