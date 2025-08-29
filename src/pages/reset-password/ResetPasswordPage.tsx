import { useState, type FormEvent } from "react";
import "./ResetPasswordPage.css";
import type { AxiosError } from "axios";
import { useNavigate, type ErrorResponse } from "react-router-dom";
import api from "../../api/api";
import type { ApiResponse } from "../../types/api-response";

type ResetPasswordRequest = {
  email: string;
};

type ResetPasswordResponse = {
  message: string;
};

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ResetPasswordRequest>({
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
      const response = await api.post<ApiResponse<ResetPasswordResponse>>(
        "/auth/request-password-reset",
        form
      );

      alert(response.data.data?.message);

      navigate("/change-password");
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
              Por favor, digite seu e-mail.
            </h2>

            <div className="reset-password-group">
              <label className="reset-password-label" htmlFor="code">
                Email:
              </label>
              <input
                className="reset-password-input"
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
              className="reset-password-button"
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
        className="reset-password-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
