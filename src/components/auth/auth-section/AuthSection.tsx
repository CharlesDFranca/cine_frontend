import "./AuthSection.css";

import { type ReactNode } from "react";

type AuthSectionProps = {
  children: ReactNode;
};

export function AuthSection({ children }: AuthSectionProps) {
  return (
    <section className="auth-section">
      <div className="auth-left-side">
        <div className="auth-container">
          <h1 className="auth-logo">CineVerse</h1>

          {children}
        </div>
      </div>
      <img
        src="src/assets/pessoas_sentadas_assistindo.png"
        className="auth-image"
        alt="Cinco pessoas sentadas assistindo a uma tela amarela ao céu aberto, o fundo é azul e há lâmpadas amarelas"
      />
    </section>
  );
}
