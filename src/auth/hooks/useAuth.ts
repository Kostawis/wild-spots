import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { fetchPlaces } from "../../redux/places/thunks/fetchPlaces";
import { routes } from "../../router/routes";
import supabase from "../../supabase";
import {
  LoginInput,
  RegisterInput,
  ResetPassword,
  ResetPasswordRequest,
} from "../auth.types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const login = async (formValues: LoginInput) => {
    setloading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });
    setloading(false);

    if (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const logout = async () => {
    setloading(true);
    await supabase.auth.signOut();
    setloading(false);
    dispatch(fetchPlaces());
  };

  const register = async (formValues: RegisterInput) => {
    setloading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
      options: {
        data: {
          username: formValues.username.length ? formValues.username : null,
          accepted_privacy_policy: true,
        },
      },
    });
    setloading(false);

    if (error) {
      toast.error(error.message);
      console.error(error);
      return;
    }

    if (data.user?.identities?.length === 0) {
      toast.warning(
        "Konto o takim adresie email już istnieje. Zaloguj się za pomocą Discord'a lub hasła.",
      );
      console.error("Konto o takim adresie email już istnieje.");
    } else {
      toast.success("Konto utworzone!");
      navigate(routes.registerSuccess);
    }
  };

  const resetPasswordRequest = async (formValues: ResetPasswordRequest) => {
    setloading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      formValues.email,
      {
        redirectTo: `${window.location.origin}${routes.resetPassword}`,
      },
    );

    setloading(false);

    if (error) {
      toast.error(error.message);
      console.error(error);
    } else {
      toast.success("Email do zmiany hasła został wysłany na skrzynkę!");
      navigate(routes.forgotPasswordSuccess);
    }
  };

  const resetPassword = async (formValues: ResetPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: formValues.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Hasło zmienione pomyślnie!");
      setTimeout(() => navigate(routes.login), 2000);
    }
  };

  return {
    login,
    logout,
    register,
    resetPasswordRequest,
    resetPassword,
    loading,
  };
};
