import "./AuthInput.css";

import type { InputHTMLAttributes, ReactNode } from "react";

type AuthInputProps = {
  children: ReactNode;
  label: string;
  type: string;
  inputId: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function AuthInput({
  children,
  label,
  type,
  inputId,
  ...props
}: AuthInputProps) {
  return (
    <div className="auth-group">
      <label className="auth-label" htmlFor={inputId}>
        {label}
      </label>

      <input
        className="auth-input"
        type={type}
        id={inputId}
        {...props}
        required
      />

      {children}
    </div>
  );
}
