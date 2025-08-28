import { useState, type FormEvent } from "react";
import "./VerifyEmailPage.css";
import type { AxiosError } from "axios";
import { useNavigate, type ErrorResponse } from "react-router-dom";
import api from "../../api/api";
import type { ApiResponse } from "../../types/api-response";

type RegisterRequest = {
  userId: string;
  code: string;
};

type RegisterResponse = {
  message: string;
};

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterRequest>({
    code: "",
    userId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) throw new Error("Usuário não registrado.");

      form.userId = userId;

      await api.post<ApiResponse<RegisterResponse>>(
        "/auth/validate-email",
        form
      );

      localStorage.removeItem("userId");

      navigate("/login");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiResponse<ErrorResponse>>;
      console.log({ ...error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="validation-section">
      <div className="validation-left-side">
        <div className="validation-container">
          <h1 className="validation-logo">CineVerse</h1>

          <form className="validation-form" onSubmit={handleSubmit}>
            <h2 className="validation-form-message">
              Insira o código enviado por email.
            </h2>

            <div className="validation-group">
              <label className="validation-label" htmlFor="code">
                Código:
              </label>
              <input
                className="validation-input"
                placeholder="Digite o código"
                type="number"
                id="code"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="validation-button"
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
        className="validation-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
