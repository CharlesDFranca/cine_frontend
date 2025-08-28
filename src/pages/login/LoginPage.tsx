import "./LoginPage.css";

export function LoginPage() {
  return (
    <section className="login-section">
      <div className="login-left-side">
        <div className="login-container">
          <h1 className="login-logo">CineVerse</h1>

          <form action="" className="login-form">
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
                required
              />
            </div>

            <button className="login-button" type="submit">
              Entrar
            </button>
            <div className="login-links">
              <a href="#">Esqueceu a senha?</a>
              <span>
                Não possui conta? <a href="#">Faça o cadastro.</a>
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
