import HorizontalSeparator from "../../components/HorizontalSeparator";
import FormHeader from "../components/FormHeader";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

export const ResetPasswordPage = () => {
  return (
    <>
      <FormHeader>Resetuj hasło</FormHeader>
      <HorizontalSeparator className="mb-4" />
      <ResetPasswordForm />
    </>
  );
};
