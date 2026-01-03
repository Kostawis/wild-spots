import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapClickContext } from "./CreateNewPlace";

type Props = {
  clickContext: NonNullable<MapClickContext>;
  onAddPlace: () => void;
  onClose: () => void;
};

const MENU_WIDTH = 150;
const MENU_OFFSET = 8;

function getMenuPosition(point: L.Point) {
  const openLeft = point.x + MENU_WIDTH + MENU_OFFSET > window.innerWidth;

  return {
    left: openLeft ? point.x - MENU_WIDTH - MENU_OFFSET : point.x + MENU_OFFSET,
    top: point.y + MENU_OFFSET,
  };
}

export const MapContextMenu = ({
  clickContext,
  onAddPlace,
  onClose,
}: Props) => {
  const { left, top } = getMenuPosition(clickContext.point);

  return (
    <div
      className="absolute z-50 overflow-hidden bg-white rounded-lg shadow-lg"
      style={{ left, top }}
      onMouseLeave={onClose}
    >
      <button
        onClick={onAddPlace}
        className="block w-full px-4 py-2 text-sm text-left text-gray-500 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Dodaj miejscówkę
      </button>

      <button
        onClick={onClose}
        className="block w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100"
      >
        Anuluj
      </button>
    </div>
  );
};
