import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginInput } from "../../auth.types";
import { formInputRules } from "../../../utils/formInputRules";
import TextInput from "../../../components/inputs/TextInput";
import Button from "../../../components/Button";

const LoginForm: FC = () => {
  const { state } = useLocation();
  const { login, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: state?.email || "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    login(data);
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
            error={errors.password?.message || errors.root?.message}
            onChange={onChange}
            value={value}
            placeholder="Hasło"
          />
        )}
      />
      <Button type="submit" fullWidth isLoading={loading}>
        Zaloguj się
      </Button>
    </form>
  );
};

export default LoginForm;
