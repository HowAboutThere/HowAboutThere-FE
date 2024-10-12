import Pin from "@/assets/map/pin.png";
import { cn } from "@/lib/utils";
import { LatLng } from "@/types/location-type";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

type MapPinProps = {
  position: LatLng;
  isAnimated?: boolean;
};

export default function MapPin({ position, isAnimated: isHover }: MapPinProps) {
  return (
    <AdvancedMarker position={position}>
      <img className={cn("w-4", isHover && " animate-bounce")} src={Pin} alt="pin" />
    </AdvancedMarker>
  );
}
