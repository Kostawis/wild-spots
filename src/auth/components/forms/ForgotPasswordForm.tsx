import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import TextInput from "../../../components/inputs/TextInput";
import { formInputRules } from "../../../utils/formInputRules";
import { ResetPasswordRequest } from "../../auth.types";
import { useAuth } from "../../hooks/useAuth";

export const ForgotPasswordForm = () => {
  const { resetPasswordRequest, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequest>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordRequest> = async (data) => {
    await resetPasswordRequest(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
          required: formInputRules.required.general,
          pattern: formInputRules.pattern.email,
        }}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Adres email"
            error={errors.email?.message}
            onChange={onChange}
            value={value}
            placeholder="Email"
          />
        )}
      />
      <Button type="submit" fullWidth isLoading={loading}>
        Wyślij link do zmiany hasła
      </Button>
    </form>
  );
};
