import { Drawer } from "vaul";
import { useAppSelector } from "../../redux/hooks";
import { selectSelectedPlace } from "../../redux/places/placesSelectors";

import { useState } from "react";
import { useWindowWidthState } from "../../context/windowWidthContext";
import { useClosePlace } from "../../hooks/useClosePlace";
import { PlaceDetails } from "./PlaceDetails";

export const PlaceDrawer = () => {
  const closePlace = useClosePlace();

  const currentPlace = useAppSelector(selectSelectedPlace);
  const { isMobile } = useWindowWidthState();

  const snapPoints = ["220px", "500px"];
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const isLastSnap = snap === snapPoints[snapPoints.length - 1];

  if (!currentPlace || !isMobile) return null;

  return (
    <Drawer.Root
      open={!!currentPlace}
      onClose={closePlace}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      modal={false}
    >
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="fixed inset-x-0 bottom-0 -mx-px flex h-full max-h-[90%] flex-col rounded-t-xl bg-white py-4">
          <div className="mx-auto mb-3 h-1 w-12 shrink-0 rounded bg-gray-300" />
          <PlaceDetails place={currentPlace} isLastSnap={isLastSnap} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
