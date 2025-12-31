import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../auth/pages/LoginPage.tsx";
import RegisterPage from "../auth/pages/RegisterPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import { AuthTemplate } from "../templates/AuthTemplate.tsx";
import Providers from "../Providers.tsx";
import MainTemplate from "../templates/MainTemplate.tsx";
import HomeTemplate from "../templates/HomeTemplate.tsx";
import { routes } from "./routes.ts";
import AuthenticationCallbackPage from "../auth/pages/AuthenticationCallbackPage.tsx";
import FullPageInfoTemplate from "../templates/FullPageInfoTemplate.tsx";
import { SuccessRegisterPage } from "../auth/pages/SuccessRegisterPage.tsx";
import PrivateRoute from "../auth/templates/PrivateRoute.tsx";
import AccountTemplate from "../dashboard/templates/AccountTemplate.tsx";
import AccountTabsTemplate from "../dashboard/templates/AccountTabsTemplate.tsx";
import SettingsTemplate from "../dashboard/templates/SettingsTemplate.tsx";
import DashboardGeneralPage from "../dashboard/pages/DashboardGeneralPage.tsx";
import { DashboardPlacesPage } from "../dashboard/pages/DashboardPlacesPage.tsx";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Providers />,
    children: [
      {
        path: routes.authCallback,
        element: <AuthenticationCallbackPage />,
      },

      {
        path: routes.home,
        element: <MainTemplate />,
        children: [
          {
            element: <HomeTemplate />,
            children: [
              // Public routes
              {
                path: routes.home,
                element: <HomePage />,
              },
              {
                element: <FullPageInfoTemplate />,
                children: [
                  {
                    path: routes.registerSuccess,
                    element: <SuccessRegisterPage caseType="processing" />,
                  },
                ],
              },
            ],
          },

          // Auth Protected routes
          {
            element: <AuthTemplate />,
            children: [
              {
                path: routes.login,
                element: <LoginPage />,
              },
              {
                path: routes.register,
                element: <RegisterPage />,
              },
            ],
          },
        ],
      },

      // * Protected pages
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <MainTemplate />,
            children: [
              {
                element: <AccountTemplate />,
                children: [
                  {
                    element: <AccountTabsTemplate />,
                    children: [
                      {
                        path: routes.dashboard.main,
                        element: <DashboardGeneralPage />,
                      },
                      {
                        path: routes.dashboard.places,
                        element: <DashboardPlacesPage />,
                      },
                      // {
                      //   path: routes.account.technicalBackground,
                      //   element: <AccountTechnicalBackgroundPage />,
                      // },
                      {
                        element: <SettingsTemplate />,
                        children: [
                          // {
                          //   path: routes.dashboard.settings.accountSettings,
                          //   element: <AccountSettingsPage />,
                          // },
                          // {
                          //   path: routes.account.settings.pilotInformations,
                          //   element: <PilotInformationsSettingsPage />,
                          // },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
