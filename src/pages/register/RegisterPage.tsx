import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPageStyle.css";
import api from "../../api/api";
import { AxiosError } from "axios";
import type { ApiResponse, ErrorResponse } from "../../types/api-response";

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  message: string;
  userId: string;
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterRequest>({
    name: "",
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
      await api.post<RegisterResponse>("/auth/register", form);
      navigate("/verify-email");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiResponse<ErrorResponse>>;
      console.log({ ...error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration-section">
      <div className="registration-left-side">
        <div className="registration-container">
          <h1 className="registration-logo">CineVerse</h1>

          <form className="registration-form" onSubmit={handleSubmit}>
            <h2 className="registration-form-message">Seja muito bem vindo!</h2>

            <div className="registration-group">
              <label className="registration-label" htmlFor="name">
                Nome:
              </label>
              <input
                className="registration-input"
                placeholder="Digite seu nome"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registration-group">
              <label className="registration-label" htmlFor="email">
                E-mail:
              </label>
              <input
                className="registration-input"
                placeholder="Digite seu email"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registration-group">
              <label className="registration-label" htmlFor="password">
                Senha:
              </label>
              <input
                className="registration-input"
                placeholder="Digite sua senha"
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="registration-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <div className="registration-links">
              <span>
                Já possui conta? <Link to="/login">Faça o login.</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <img
        src="src/assets/pessoas_sentadas_assistindo.png"
        className="registration-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
