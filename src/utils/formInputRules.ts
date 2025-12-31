import { emailReg } from "./reg";

export const formInputRules = {
  required: {
    general: { value: true, message: "Pole nie może być puste" },
  },
  minLength: {
    password: {
      value: 8,
      message: "Hasło musi mieć co najmniej 8 znaków",
    },
  },
  pattern: {
    username: {
      value: /^[a-zA-Z0-9_]{3,}$/,
      message:
        "Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia oraz musi mieć co najmniej 3 znaki",
    },
    email: {
      value: emailReg,
      message: "Adres email ma nieprawidłowy format",
    },
  },
  validate: {
    username: (value: string | undefined) =>
      value === "" ||
      (value && value.length >= 3) ||
      "Nazwa użytkownika jest za krótka",
  },
};
