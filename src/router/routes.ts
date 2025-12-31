export const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  registerSuccess: "/auth/register/success",
  authCallback: "/auth/callback",
  dashboard: {
    main: "/dashboard",
    places: "/dashboard/places",
    settings: {
      accountSettings: "/dashboard/settings/account",
      pilotInformations: "/dashboard/settings/pilot-informations",
    },
  },
  empty: "*",
};
