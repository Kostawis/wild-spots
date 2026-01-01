import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import TextInput from "../../../components/inputs/TextInput";
import { routes } from "../../../router/routes";
import { formInputRules } from "../../../utils/formInputRules";
import { LoginInput } from "../../auth.types";
import { useAuth } from "../../hooks/useAuth";

const LoginForm: FC = () => {
  const { login, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    login(data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
          required: formInputRules.required.general,
          pattern: formInputRules.pattern.email,
        }}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Twój email"
            error={errors.email?.message}
            onChange={onChange}
            value={value}
            placeholder="Email"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            type="password"
            label="Twoje hasło"
            onChange={onChange}
            value={value}
            placeholder="Hasło"
            className="pb-1"
          />
        )}
      />
      <Link
        className="mb-4 text-sm text-gray-800 underline"
        to={routes.forgotPassword}
      >
        Nie pamiętam hasła
      </Link>
      <Button type="submit" fullWidth isLoading={loading}>
        Zaloguj się
      </Button>
    </form>
  );
};

export default LoginForm;
