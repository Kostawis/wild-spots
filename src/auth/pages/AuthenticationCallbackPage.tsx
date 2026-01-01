import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../router/routes";
import supabase from "../../supabase";

const AuthenticationCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate(routes.login);
        return;
      }

      // tutaj możesz:
      // 1. sprawdzić czy profil istnieje
      // 2. zrobić onboarding
      navigate(routes.home);
    };

    handleAuth();
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default AuthenticationCallbackPage;
