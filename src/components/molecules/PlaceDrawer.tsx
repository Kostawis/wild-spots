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

  const snapPoints = ["180px", 1];
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
        <Drawer.Content className="border-b-none fixed bottom-0 left-0 right-0 mx-[-1px] flex h-full max-h-[90%] flex-col rounded-t-[10px] border border-gray-200 bg-white">
          {/* Drag handle */}
          <div className="w-12 h-1 mx-auto my-3 bg-gray-300 rounded shrink-0" />
          <Drawer.Title>Detale miejscówki</Drawer.Title>
          <PlaceDetails place={currentPlace} isLastSnap={isLastSnap} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
