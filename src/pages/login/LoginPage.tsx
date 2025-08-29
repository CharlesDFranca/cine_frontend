import type { AxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";
import "./LoginPage.css";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        form
      );

      if (!response.data.success || !response.data.data) {
        throw new Error("Algo deu errado");
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
    <section className="login-section">
      <div className="login-left-side">
        <div className="login-container">
          <h1 className="login-logo">CineVerse</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-form-message">Bem vindo de volta!</h2>

            <div className="login-group">
              <label className="login-label" htmlFor="email">
                E-mail:
              </label>
              <input
                className="login-input"
                placeholder="Digite seu email"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-group">
              <label className="login-label" htmlFor="password">
                Senha:
              </label>
              <input
                className="login-input"
                placeholder="Digite sua senha"
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Entrando.." : "Entrar"}
            </button>
            <div className="login-links">
              <Link to="/forgot-password">Esqueceu a senha?</Link>
              <span>
                Não possui conta? <Link to="/register">Faça o cadastro.</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <img
        src="src/assets/pessoas_sentadas_assistindo.png"
        className="login-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
