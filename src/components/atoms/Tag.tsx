import { twMerge } from "tailwind-merge";
import { Enums } from "../../supabase/database.types";

type StatusType = Enums<"place_status">;
type CategoryType = Enums<"place_category">;
type TerrainType = Enums<"terrain_type">;

type Variant = "status" | "category" | "terrain";

type TagValueMap = {
  status: StatusType;
  category: CategoryType;
  terrain: TerrainType;
};

const TAG_STYLES: {
  [K in Variant]: Record<TagValueMap[K], string>;
} = {
  status: {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    declined: "bg-red-100 text-red-800",
  },
  category: {
    legal: "bg-green-100 text-green-900",
    "semi-legal": "bg-yellow-100 text-yellow-900",
    closed: "bg-red-200 text-red-900",
  },
  terrain: {
    forest: "bg-green-100 text-green-900",
    sand: "bg-yellow-100 text-yellow-900",
    gravel: "bg-gray-200 text-gray-900",
    mud: "bg-orange-200 text-orange-900",
    asphalt: "bg-zinc-200 text-zinc-900",
    rocks: "bg-indigo-100 text-indigo-900",
  },
};

const TAG_LABELS: {
  [K in Variant]: Record<TagValueMap[K], string>;
} = {
  status: {
    active: "Aktywny",
    pending: "Oczekujący",
    declined: "Odrzucony",
  },
  category: {
    legal: "Legalna",
    "semi-legal": "Na dziko",
    closed: "Zamknięta",
  },
  terrain: {
    forest: "Las",
    sand: "Piasek",
    gravel: "Żwir / Szuter",
    mud: "Błoto",
    asphalt: "Asfalt",
    rocks: "Kamienie",
  },
};

type TagProps<V extends Variant> = {
  variant: V;
  value: TagValueMap[V];
  children?: React.ReactNode;
  className?: string;
};

export const Tag = <V extends Variant>({
  variant,
  value,
  children,
  className,
}: TagProps<V>) => {
  return (
    <span
      className={twMerge(
        "flex h-fit w-fit items-center rounded-lg px-2.5 py-0.5 text-sm font-medium",
        TAG_STYLES[variant][value],
        className,
      )}
    >
      {children ?? TAG_LABELS[variant][value]}
    </span>
  );
};
