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
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mx-[-1px] flex h-full max-h-[90%] flex-col rounded-t-xl bg-white py-4">
          <div className="flex-shrink-0 w-12 h-1 mx-auto mb-3 bg-gray-300 rounded" />
          <PlaceDetails place={currentPlace} isLastSnap={isLastSnap} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
