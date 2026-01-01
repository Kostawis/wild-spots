export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  policy: boolean;
};

export type ResetPasswordRequest = {
  email: string;
};

export type ResetPassword = {
  password: string;
  confirmPassword: string;
};
