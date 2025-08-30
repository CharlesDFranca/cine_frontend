import "./AuthButton.css";

type AuthButton = {
  loading: boolean;
  loadindMessage: string;
  buttonMessage: string;
};

export function AuthButton({
  loading,
  loadindMessage,
  buttonMessage,
}: AuthButton) {
  return (
    <button className="auth-button" type="submit" disabled={loading}>
      {loading ? loadindMessage : buttonMessage}
    </button>
  );
}
