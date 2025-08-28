import "./VerifyEmailPage.css";

export function VerifyEmailPage() {
  return (
    <section className="validation-section">
      <div className="validation-left-side">
        <div className="validation-container">
          <h1 className="validation-logo">CineVerse</h1>

          <form action="" className="validation-form">
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
                required
              />
            </div>

            <button className="validation-button" type="submit">
              Verificar
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
