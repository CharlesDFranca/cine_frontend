import "./AuthButton.css";

type AuthButton = {
  loading: boolean;
  loadingMessage: string;
  buttonMessage: string;
};

export function AuthButton({
  loading,
  loadingMessage,
  buttonMessage,
}: AuthButton) {
  return (
    <button className="auth-button" type="submit" disabled={loading}>
      {loading ? loadingMessage : buttonMessage}
    </button>
  );
}
