export const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  registerSuccess: "/auth/register/success",
  authCallback: "/auth/callback",
  forgotPassword: "/auth/forgot-password",
  forgotPasswordSuccess: "/auth/forgot-password/success",
  resetPassword: "/auth/reset-password",
  dashboard: {
    main: "/dashboard",
    places: "/dashboard/places",
    settings: {
      accountSettings: "/dashboard/settings/account",
      pilotInformations: "/dashboard/settings/pilot-informations",
    },
  },
  privacyPolicy: "/polityka-prywatności",
  empty: "*",
};
