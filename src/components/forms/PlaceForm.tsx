import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "../../modal/hooks/useModal";
import TextareaInput from "../inputs/TextareaInput";
import Button from "../Button";
import { formInputRules } from "../../utils/formInputRules";
import TextInput from "../inputs/TextInput";
import { Enums } from "../../supabase/database.types";
import Select, { SelectInputItems } from "../inputs/SelectInput";
import { find } from "lodash";
import { InformationBox } from "../InformationBox";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addPlace } from "../../redux/places/thunks/addPlace";
import { toast } from "sonner";
import { clearCoordinates } from "../../redux/coordinates/placeCoordinatesSlice";
import { routes } from "../../router/routes";
import { useWindowWidthState } from "../../context/windowWidthContext";
import { closeDrawer } from "../../redux/drawer/drawerSlice";

const CATEGORY_TYPE_SELECT_ITEMS: SelectInputItems[] = [
  {
    id: "legal",
    name: "Legalnie",
    description:
      "Tu mozesz polatać z czystą głową - miejsce przeznaczone do upalania",
  },
  {
    id: "semi-legal",
    name: "Na dziko",
    description:
      "Tu polatasz, ale uważaj - miejsce nie jest oficjalnie przeznaczone do upalania",
  },
  {
    id: "closed",
    name: "Zamknięte",
    description: "Tu nie pojezdzisz - miejsce jest juz zamknięte",
  },
];

export const PlaceForm: FC = () => {
  const dispatch = useAppDispatch();
  const { placeCoordinates, places } = useAppSelector((state) => state);
  const { isMobile } = useWindowWidthState();

  const {
    openConfirmationModal,
    closeMainModal,
    closeAllModals,
    setMainModalActions,
  } = useModal();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<{
    name: string;
    category: SelectInputItems["id"];
    description: string;
  }>({
    defaultValues: {
      name: "",
      category: CATEGORY_TYPE_SELECT_ITEMS[0].id,
      description: "",
    },
  });

  const onClose = () => {
    if (isDirty)
      if (isMobile) {
        window.confirm("Czy na pewno chcesz porzucić zmiany?") &&
          dispatch(closeDrawer());
      } else {
        openConfirmationModal({
          title: "Niezapisane zmiany",
          content: "Czy na pewno chcesz kontynuować?",
          confirmationButtonTitle: "Tak, porzuć zmiany",
          onConfirm: closeAllModals,
        });
      }
    else {
      dispatch(clearCoordinates());
      closeMainModal();
      dispatch(closeDrawer());
    }
  };

  const onSubmit: SubmitHandler<{
    name: string;
    category: SelectInputItems["id"];
    description: string;
  }> = async (input) => {
    if (!placeCoordinates.coordinates) {
      console.error("No coordinates set for the place.");
      return;
    }

    try {
      await dispatch(
        addPlace({
          name: input.name,
          description: input.description,
          category: input.category as Enums<"place_category">,
          ...placeCoordinates.coordinates,
        }),
      ).unwrap();

      dispatch(clearCoordinates());
      closeMainModal();
      toast.success("Miejscówka dodana pomyślnie! Oczekuje na zatwierdzenie.");
    } catch (error) {
      toast.error("Wystąpił błąd podczas dodawania miejscówki.");
      console.error("Error adding place:", error);
    }
  };

  useEffect(() => {
    setMainModalActions({ onClose });
  }, [onClose]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-y-auto px-3">
        <Controller
          control={control}
          name="name"
          rules={{
            required: formInputRules.required.general,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Nazwa miejscówki"
              error={errors.name?.message}
              onChange={onChange}
              value={value}
              placeholder="Wpisz nazwę miejscówki..."
              className="min-w-full flex-[2] sm:min-w-[340px]"
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Kategoria miejscówki"
              error={errors.category?.message}
              onChange={onChange}
              value={
                find(CATEGORY_TYPE_SELECT_ITEMS, ({ id }) => id === value) ||
                CATEGORY_TYPE_SELECT_ITEMS[0]
              }
              placeholder="Wpisz opis dla swojego drona..."
              items={CATEGORY_TYPE_SELECT_ITEMS}
              className="flex-1"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextareaInput
              label="Opis miejscówki"
              error={errors.description?.message}
              onChange={onChange}
              value={value}
              placeholder="Co wiesz na temat tego miejsca? Jakieś wskazówki dla innych użytkowników..."
            />
          )}
        />

        <InformationBox title="Ważne">
          Po dodaniu miejscówki trafi ona do{" "}
          <span className="font-bold">administracji</span> w oczekiwaniu na
          zatwierdzenie. Po zaakceptowaniu będzie widoczna dla wszystkich.
          Status sprawdzisz w zakładce{" "}
          <Link
            to={routes.dashboard.places}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            Moje miejscówki
          </Link>
        </InformationBox>
      </div>
      <div className="mt-2 flex justify-end gap-x-3 px-3">
        <Button color="transparent" onClick={onClose}>
          Zamknij
        </Button>
        <Button
          type="submit"
          isLoading={places.createStatus === "loading"}
          disabled={!isDirty}
        >
          Zapisz
        </Button>
      </div>
    </form>
  );
};
