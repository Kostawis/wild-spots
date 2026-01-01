import HorizontalSeparator from "../../components/HorizontalSeparator";
import FormHeader from "../components/FormHeader";
import { ForgotPasswordForm } from "../components/forms/ForgotPasswordForm";

export const ForgotPasswordPage = () => {
  return (
    <>
      <FormHeader>Resetuj hasło</FormHeader>
      <HorizontalSeparator className="mb-4" />
      <ForgotPasswordForm />
    </>
  );
};
