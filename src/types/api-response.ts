export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  meta: Record<string, unknown> | null;
  errors: Record<string, unknown>;
  message: string;
};

export type ErrorResponse = {
  code: string;
  type: "Validation" | "Domain" | "Application" | "Infrastructure" | "Internal";
  message: string;
  details?: Record<string, unknown>;
};
