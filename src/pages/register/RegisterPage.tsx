import "./RegisterPageStyle.css";

export function RegisterPage() {
  return (
    <section className="registration-section">
      <div className="registration-left-side">
        <div className="registration-container">
          <h1 className="registration-logo">CineVerse</h1>

          <form action="" className="registration-form">
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
                required
              />
            </div>

            <button className="registration-button" type="submit">
              Cadastrar
            </button>
            <div className="registration-links">
              <span>
                Já possui conta? <a href="#">Faça o login.</a>
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
