import _, { find } from "lodash";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useWindowWidthState } from "../../context/windowWidthContext";
import { useModal } from "../../modal/hooks/useModal";
import { clearCoordinates } from "../../redux/coordinates/placeCoordinatesSlice";
import { closeDrawer } from "../../redux/drawer/drawerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { usePlaces } from "../../redux/places/hooks/usePlaces";
import { selectPlaceById } from "../../redux/places/placesSelectors";
import { addPlace } from "../../redux/places/thunks/addPlace";
import { updatePlace } from "../../redux/places/thunks/updatePlace";
import { routes } from "../../router/routes";
import { Enums } from "../../supabase/database.types";
import { formInputRules } from "../../utils/formInputRules";
import Button from "../Button";
import { InformationBox } from "../InformationBox";
import { MapInput } from "../inputs/MapInput";
import Select, { SelectInputItems } from "../inputs/SelectInput";
import TextareaInput from "../inputs/TextareaInput";
import TextInput from "../inputs/TextInput";

type PlaceForm = {
  placeId?: number;
};

type FormTypes = {
  name: string;
  category: SelectInputItems["id"];
  description: string;
  location: {
    lat: L.LatLng["lat"];
    lng: L.LatLng["lng"];
  };
};

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

export const PlaceForm: FC<PlaceForm> = ({ placeId }) => {
  const dispatch = useAppDispatch();
  const { placesStatuses } = usePlaces();
  const { placeCoordinates, places } = useAppSelector((state) => state);
  const { isMobile } = useWindowWidthState();
  const place = useAppSelector(selectPlaceById(placeId));

  const {
    openConfirmationModal,
    closeMainModal,
    closeAllModals,
    setMainModalActions,
  } = useModal();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<FormTypes>({
    defaultValues: {
      name: place?.name || "",
      category: place?.category || CATEGORY_TYPE_SELECT_ITEMS[0].id,
      description: place?.description || "",
      location: {
        lat: place?.lat || placeCoordinates.coordinates?.lat,
        lng: place?.lng || placeCoordinates.coordinates?.lng,
      },
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

  const onSubmit: SubmitHandler<FormTypes> = async (input) => {
    const isSensitiveFieldsChanged = !_.isEmpty(
      _.pick(dirtyFields, ["name", "description"]),
    );

    try {
      if (place) {
        await dispatch(
          updatePlace({
            id: place.id,
            changes: {
              name: input.name,
              description: input.description,
              category: input.category as Enums<"place_category">,
              ...input.location,
              status: isSensitiveFieldsChanged ? "pending" : place.status,
            },
          }),
        ).unwrap();
        toast.success(
          "Miejscówka zaktualizowana pomyślnie! Oczekuje na zatwierdzenie.",
        );
      } else {
        await dispatch(
          addPlace({
            name: input.name,
            description: input.description,
            category: input.category as Enums<"place_category">,
            ...input.location,
          }),
        ).unwrap();
        toast.success(
          "Miejscówka dodana pomyślnie! Oczekuje na zatwierdzenie.",
        );
      }

      dispatch(clearCoordinates());
      closeMainModal();
      dispatch(closeDrawer());
    } catch (error) {
      toast.error("Wystąpił błąd podczas dodawania miejscówki.");
      console.error("Error adding place:", error);
    }
  };

  useEffect(() => {
    setMainModalActions({ onClose });
  }, [onClose, setMainModalActions]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-3 overflow-y-auto">
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <MapInput value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          control={control}
          name="name"
          rules={{
            required: formInputRules.required.general,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Nazwa*"
              error={errors.name?.message}
              onChange={onChange}
              value={value}
              placeholder="Wpisz nazwę miejscówki..."
              className="min-w-full flex-[2] sm:min-w-[340px]"
              loading={placesStatuses.fetchStatus === "loading"}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Kategoria*"
              error={errors.category?.message}
              onChange={onChange}
              value={
                find(CATEGORY_TYPE_SELECT_ITEMS, ({ id }) => id === value) ||
                CATEGORY_TYPE_SELECT_ITEMS[0]
              }
              placeholder="Wpisz opis dla swojego drona..."
              items={CATEGORY_TYPE_SELECT_ITEMS}
              className="flex-1"
              loading={placesStatuses.fetchStatus === "loading"}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextareaInput
              label="Opis"
              error={errors.description?.message}
              onChange={onChange}
              value={value}
              placeholder="Co wiesz na temat tego miejsca? Jakieś wskazówki dla innych użytkowników..."
              loading={placesStatuses.fetchStatus === "loading"}
            />
          )}
        />
        {place ? (
          <InformationBox title="Ważne">
            Po zaktualizowaniu{" "}
            <span className="font-bold">nazwy lub opisu</span> miejscówki zmieni
            status i trafi ponownie do{" "}
            <span className="font-bold">administracji</span> w oczekiwaniu na
            zatwierdzenie.
          </InformationBox>
        ) : (
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
        )}
      </div>
      <div className="flex justify-end px-3 mt-2 gap-x-3">
        <Button color="transparent" onClick={onClose}>
          Zamknij
        </Button>
        <Button
          type="submit"
          isLoading={
            places.createStatus === "loading" ||
            placesStatuses.updateStatus === "loading"
          }
          disabled={!isDirty}
        >
          Zapisz
        </Button>
      </div>
    </form>
  );
};
