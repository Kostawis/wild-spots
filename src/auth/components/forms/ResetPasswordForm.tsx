import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import TextInput from "../../../components/inputs/TextInput";
import { formInputRules } from "../../../utils/formInputRules";

import supabase from "../../../supabase";
import { ResetPassword } from "../../auth.types";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm: FC = () => {
  const { resetPassword, loading } = useAuth();

  useEffect(() => {
    // Supabase automatycznie ogarnia sesję z URL
    supabase.auth.getSession();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    await resetPassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="password"
        rules={{
          required: formInputRules.required.general,
          minLength: formInputRules.minLength.password,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            type="password"
            label="Nowe hasło*"
            error={errors.password?.message}
            onChange={onChange}
            value={value}
            placeholder="Podaj nowe hasło"
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: formInputRules.required.general,
          validate: (value, formValues) =>
            value === formValues.password || "Hasła nie są zgodne",
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            type="password"
            label="Potwierdz hasło*"
            error={errors.confirmPassword?.message}
            onChange={onChange}
            value={value}
            placeholder="Potwierdz hasło"
          />
        )}
      />

      <Button type="submit" isLoading={loading} fullWidth className="mt-6">
        Zresetuj hasło
      </Button>
    </form>
  );
};

export default RegisterForm;
