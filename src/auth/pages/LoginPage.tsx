import LoginForm from "../components/forms/LoginForm";
import FormHeader from "../components/FormHeader";
import HorizontalSeparator from "../../components/HorizontalSeparator";
import Paragraph from "../../components/text/Paragraph";
import { Link } from "react-router-dom";
import supabase from "../../supabase";
import { routes } from "../../router/routes.ts";
import { DiscordLoginButton } from "../components/DiscordLoginButton.tsx";

const LoginPage = () => {
  const discordHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}${routes.authCallback}`,
      },
    });
    if (error) {
      console.error("Error during Discord OAuth:", error.message);
    } else {
      console.log("Redirecting to Discord OAuth:", data);
    }
  };

  return (
    <main>
      <FormHeader>Zaloguj się</FormHeader>
      <HorizontalSeparator className="mb-4" />
      <LoginForm />
      <Paragraph className="mt-4">
        Nie masz jeszcze konta?{" "}
        <Link className="text-gray-800 underline" to={routes.register}>
          Zarejestruj się
        </Link>
      </Paragraph>

      <HorizontalSeparator className="my-6">lub</HorizontalSeparator>

      <DiscordLoginButton onClick={discordHandler} />
    </main>
  );
};

export default LoginPage;
