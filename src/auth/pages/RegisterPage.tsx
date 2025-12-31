import { Link } from "react-router-dom";
import HorizontalSeparator from "../../components/HorizontalSeparator";
import FormHeader from "../components/FormHeader";
import RegisterForm from "../components/forms/RegisterForm";
import Paragraph from "../../components/text/Paragraph";

const RegisterPage = () => {
  return (
    <main>
      <FormHeader>Zarejestruj się</FormHeader>
      <HorizontalSeparator className="mb-4" />
      <RegisterForm />
      <Paragraph className="mt-4">
        Masz już konto?{" "}
        <Link className="text-gray-800 underline" to="/auth/login">
          Zaloguj się
        </Link>
      </Paragraph>
    </main>
  );
};

export default RegisterPage;
