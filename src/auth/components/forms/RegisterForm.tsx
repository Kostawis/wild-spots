import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterInput } from "../../auth.types";
import TextInput from "../../../components/inputs/TextInput";
import { formInputRules } from "../../../utils/formInputRules";
import Button from "../../../components/Button";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm: FC = () => {
  const { register: registerHandler, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<RegisterInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    await registerHandler(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        rules={{
          // validate: (value) => formInputRules.validate.username(value),
          pattern: formInputRules.pattern.username,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nazwa użytkownika"
            error={errors.username?.message}
            onChange={onChange}
            value={value}
            placeholder="Podaj nazwę użytkownika"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: formInputRules.required.general,
          pattern: formInputRules.pattern.email,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Adres email*"
            error={errors.email?.message}
            onChange={onChange}
            value={value}
            placeholder="Podaj adres email"
          />
        )}
      />

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
            label="Hasło*"
            error={errors.password?.message}
            onChange={onChange}
            value={value}
            placeholder="Podaj hasło"
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

      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            {/* TODO: Add checkbox input to form validation */}
            <input
              {...register("policy", { required: true })}
              id="policy"
              aria-describedby="policy"
              type="checkbox"
              className="h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="policy"
              className="text-gray-500 dark:text-gray-300"
            >
              Akceptuję warunki polityki prywatności*
            </label>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={loading}
        fullWidth
        className="mt-6"
        disabled={!watch("policy")}
      >
        Zarejestruj się
      </Button>
    </form>
  );
};

export default RegisterForm;
