import { FC } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

type DirectionsButtonProps = {
  lat: number;
  lng: number;
  className?: string;
};

export const DirectionsButton: FC<DirectionsButtonProps> = ({
  lat,
  lng,
  className,
}) => {
  const handleClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      color="transparent"
      onClick={handleClick}
      className={twMerge("h-12 text-base", className)}
    >
      <span className="mr-3 text-lg">🚗</span> Wskazówki dojazdu
    </Button>
  );
};
