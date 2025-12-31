import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const DashboardSettingsPage = () => {
  // const {
  //   control,
  //   handleSubmit,
  //   setError,
  //   getValues,
  //   formState: { errors, isDirty },
  // } = useForm<UserInput>({
  //   values: {
  //     firstName: firstName || '',
  //     lastName: lastName || '',
  //     username: username || '',
  //     email: email || '',
  //   },
  // });

  // useFormErrors<UserInput>(errorUpdate, {
  //   getValues,
  //   setError,
  // });

  // const onSubmit: SubmitHandler<UserInput> = async (input) => {
  //   if (loadingGet) return;

  //   try {
  //     await updateUser({
  //       variables: {
  //         input,
  //       },
  //       onCompleted: () => toast.success('Zapisano pomyślnie'),
  //     });
  //   } catch (err) {
  //     console.error('User input error', err);
  //   }
  // };

  return (
    <form noValidate>
      Formularz ustawien profilu uzytkownika
      {/* <FormSectionTitle>Ustawienia konta</FormSectionTitle>
      <div className="grid grid-cols-auto-fill-460 gap-x-4">
        <Controller
          control={control}
          name="firstName"
          rules={{
            required: formInputRules.required.general,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Imię"
              error={errors.firstName?.message}
              onChange={onChange}
              value={value}
              placeholder="Podaj imię..."
              loading={loadingGet && !data}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={{
            required: formInputRules.required.general,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Nazwisko"
              error={errors.lastName?.message}
              onChange={onChange}
              value={value}
              placeholder="Podaj nazwisko..."
              loading={loadingGet && !data}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: formInputRules.required.general,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email"
              error={errors.email?.message}
              disabled
              onChange={onChange}
              value={value}
              placeholder="Podaj email..."
              loading={loadingGet && !data}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          rules={{
            required: formInputRules.required.general,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Nazwa uzytkownika"
              error={errors.username?.message}
              onChange={onChange}
              value={value}
              placeholder="Podaj nazwę uytkownika..."
              loading={loadingGet && !data}
            />
          )}
        />
      </div>
      <Button
        type="submit"
        isLoading={loadingUpdate}
        disabled={!isDirty}
        toLeft
      >
        Zapisz
      </Button> */}
    </form>
  );
};

export default DashboardSettingsPage;
