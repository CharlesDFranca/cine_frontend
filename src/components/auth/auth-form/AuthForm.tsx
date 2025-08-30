import "./AuthForm.css";

import type { ReactNode } from "react";

type AuthFormProps = {
  children: ReactNode;
  message: string;
  onSubmit: () => Promise<void>;
};

export function AuthForm({ children, message, onSubmit }: AuthFormProps) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="auth-form-message">{message}</h2>

      {children}
    </form>
  );
}
